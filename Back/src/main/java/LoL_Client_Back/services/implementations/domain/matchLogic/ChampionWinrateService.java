package LoL_Client_Back.services.implementations.domain.matchLogic;

import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.PlayerMatchDetailRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class ChampionWinrateService {

    private final PlayerMatchDetailRepository playerMatchDetailRepository;
    private final ChampionRepository championRepository;

    public ChampionWinrateService(PlayerMatchDetailRepository playerMatchDetailRepository,
                                  ChampionRepository championRepository) {
        this.playerMatchDetailRepository = playerMatchDetailRepository;
        this.championRepository = championRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initWinrates() {
        boolean initialized = recalculateAllChampionWinrates();
        if (initialized) {
            System.out.println("✅ Winrates inicializados desde las partidas base");
        } else {
            System.out.println("⚠️ No había partidas para calcular winrates iniciales");
        }
    }

    @Transactional
    public boolean recalculateAllChampionWinrates() {
        List<Object[]> stats = playerMatchDetailRepository.calculateChampionWinrates();

        if (stats.isEmpty()) {
            return false; // nada que recalcular
        }

        for (Object[] row : stats) {
            Long champId = (Long) row[0];
            Long wins = (Long) row[1];
            Long total = (Long) row[2];

            double winrate = total > 0 ? (wins.doubleValue() / total.doubleValue()) * 100.0 : 0.0;

            ChampionEntity champ = championRepository.findById(champId).orElseThrow();
            Double previous = champ.getWinrate();

            champ.setWinrate(clampWinrate(winrate));
            championRepository.save(champ);
        }
        return true;
    }

    @Transactional
    public void updateChampionWinrate(MatchEntity match) {

        if (match.getMap().getMap().equals("Summoners Rift")) // winrates not for aram
        {
            // usamos un set para no recalcular dos veces el mismo campeón si aparece varias veces
            Set<Long> championIds = match.getPlayerDetails().stream()
                    .map(pd -> pd.getChampion().getId())
                    .collect(Collectors.toSet());

            for (Long championId : championIds) {
                List<Object[]> stats = playerMatchDetailRepository.calculateChampionStats(championId);

                if (!stats.isEmpty()) {
                    Object[] row = stats.get(0);
                    Long wins = (Long) row[0];
                    Long total = (Long) row[1];

                    double winrate = total > 0 ? (wins.doubleValue() / total.doubleValue()) * 100.0 : 0.0;

                    ChampionEntity champ = championRepository.findById(championId).orElseThrow();
                    Double previous = champ.getWinrate();

                    champ.setWinrate(clampWinrate(winrate));

                    championRepository.save(champ);
                }
            }
        }

    }

    public TeamEntity simulateMatchWinner(List<PlayerMatchDetailEntity> details) {
        if (details == null || details.isEmpty()) return null;

        TeamEntity blueTeamEntity = details.get(0).getTeam();
        TeamEntity redTeamEntity = details.get(9).getTeam();

        double blueAvg = details.stream()
                .filter(d -> "Blue".equalsIgnoreCase(d.getTeam().getTeamColor()))
                .mapToDouble(d -> d.getChampion().getWinrate() != null ? d.getChampion().getWinrate() : 50.0)
                .average().orElse(50.0);

        double redAvg = details.stream()
                .filter(d -> "Red".equalsIgnoreCase(d.getTeam().getTeamColor()))
                .mapToDouble(d -> d.getChampion().getWinrate() != null ? d.getChampion().getWinrate() : 50.0)
                .average().orElse(50.0);

        double total = blueAvg + redAvg;
        double random = ThreadLocalRandom.current().nextDouble() * total;

        // asignamos la misma instancia que usamos para los jugadores
        return (random <= blueAvg) ? blueTeamEntity : redTeamEntity;
    }

    private double clampWinrate(double raw) {
        double min = 47.0;
        double max = 53.0;

        if (raw < min) return min;
        return Math.min(raw, max);
    }




}
