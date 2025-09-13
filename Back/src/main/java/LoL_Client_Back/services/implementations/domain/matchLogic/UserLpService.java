package LoL_Client_Back.services.implementations.domain.matchLogic;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.RankTierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class UserLpService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RankTierRepository rankTierRepository;


    public void calculateUserRanks(MatchEntity match) {
        if (match == null || match.getPlayerDetails() == null || match.getWinnerTeam() == null) {
            throw new IllegalArgumentException("El match o sus datos no son válidos.");
        }

        TeamEntity winnerTeam = match.getWinnerTeam();
        List<RankTierEntity> allTiers = rankTierRepository.findAll();

        for (PlayerMatchDetailEntity detail : match.getPlayerDetails()) {
            UserEntity user = userRepository.findById(detail.getUser().getId())
                    .orElseThrow(() -> new IllegalStateException("Usuario no encontrado: " + detail.getUser().getId()));

            boolean isWinner = detail.getTeam().equals(winnerTeam);

            // Si no tiene rango asignado todavía → Bronze
            if (user.getRank() == null) {
                RankTierEntity bronze = allTiers.stream()
                        .filter(r -> r.getRank().equalsIgnoreCase("Bronze"))
                        .findFirst()
                        .orElseThrow(() -> new IllegalStateException("No existe Bronze en rank_tiers"));
                user.setRank(bronze);
                user.setRankLp(0);
            }

            // Inicializamos LP en base al tier si está null
            if (user.getRankLp() == null) {
                user.setRankLp(user.getRank().getLp());
            }

            // Aplicar la ganancia/pérdida de LP
            int lpChange = isWinner ? 24 : -20;
            int tempLp = user.getRankLp() + lpChange;
            int newLp = Math.max(tempLp, 0); // ya nunca cambia después
            user.setRankLp(newLp);

            // Ajustar rango en base al nuevo LP
            RankTierEntity newTier = allTiers.stream()
                    .filter(t -> newLp >= t.getLp())
                    .max(Comparator.comparingInt(RankTierEntity::getLp))
                    .orElse(user.getRank());

            user.setRank(newTier);

            // Guardamos el user actualizado
            userRepository.save(user);
        }
    }
}
