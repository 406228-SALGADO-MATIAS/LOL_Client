package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.entities.reference.MapEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMatchesServiceImpl implements UserMatchesService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserMatchesRepository userMatchesRepository;

    @Override
    public UserMatches createUserMatches(UserEntity userEntity) {
        UserMatchesEntity userMatchesEntity = new UserMatchesEntity();
        userMatchesEntity.setUser(userEntity);

        return modelMapper.map
                (userMatchesRepository.save(userMatchesEntity),
                        UserMatches.class);
    }

    @Override
    public UserMatches findByUser(UserEntity userEntity) {
        Optional<UserMatchesEntity> optional
                = userMatchesRepository.findByUser(userEntity);
        if (optional.isPresent())
        {
            return modelMapper.map(optional.get(),UserMatches.class);
        }
        return new UserMatches();
    }

    @Override
    public void updateUsers(List<PlayerMatchDetailEntity> players) {
        for (PlayerMatchDetailEntity player : players){
            updateUser(player);
        }
    }

    private void updateUser(PlayerMatchDetailEntity player){
        TeamEntity winnerTeam = player.getMatch().getWinnerTeam();
        TeamEntity playerTeam = player.getTeam();
        MapEntity map = player.getMatch().getMap();
        boolean ranked = player.getMatch().getRanked();
        boolean didPlayerWin = winnerTeam.equals(playerTeam);

        Optional<UserMatchesEntity> optional =
                userMatchesRepository.findByUser(player.getUser());

        UserMatchesEntity matches = new UserMatchesEntity();

        if (optional.isPresent()) matches = optional.get();
        else matches.setUser(player.getUser());

        if (ranked)
        {
            int rankedsPlayed = matches.getRankedsPlayed() + 1;
            if (didPlayerWin) {
                int rankedWins = matches.getRankedWins() + 1;
                matches.setRankedWins(rankedWins);
            }
            matches.setRankedsPlayed(rankedsPlayed);
        }
        else if (map.getId().equals(1L))
        {
            int normalsPlayed = matches.getNormalGamesPlayed() + 1;
            if (didPlayerWin){
                int normalWins = matches.getNormalWins() + 1;
                matches.setNormalWins(normalWins);
            }
            matches.setNormalGamesPlayed(normalsPlayed);
        }
        else
        {
            int aramsPlayed = matches.getAramsPlayed() + 1;
            if (didPlayerWin){
                int aramWins = matches.getAramWins() + 1;
                matches.setAramWins(aramWins);
            }
            matches.setAramsPlayed(aramsPlayed);
        }
        userMatchesRepository.save(matches);
    }

}
