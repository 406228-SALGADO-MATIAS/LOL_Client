package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.enums.ChampionRole;
import LoL_Client_Back.dtos.userStats.UserGeneralStatsDTO;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.entities.reference.MapEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.PlayerMatchDetailRepository;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.RoleRepository;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserMatchesServiceImpl implements UserMatchesService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserMatchesRepository userMatchesRepository;
    @Autowired
    PlayerMatchDetailRepository playerMatchDetailRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChampionRepository championRepository;

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

        if (map.getId().equals(1L))
        {
            if (ranked)
            {
                int rankedsPlayed = matches.getRankedsPlayed() + 1;
                if (didPlayerWin) {
                    int rankedWins = matches.getRankedWins() + 1;
                    matches.setRankedWins(rankedWins);
                }
                matches.setRankedsPlayed(rankedsPlayed);
            }
            else
            {
                int normalsPlayed = matches.getNormalGamesPlayed() + 1;
                if (didPlayerWin){
                    int normalWins = matches.getNormalWins() + 1;
                    matches.setNormalWins(normalWins);
                }
                matches.setNormalGamesPlayed(normalsPlayed);
            }
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

    @Override
    public UserGeneralStatsDTO getGeneralStats(Long userId, String gameType) {
        checkUserExistence(userId);
        List<PlayerMatchDetailEntity> details = playerMatchDetailRepository.findByUserId(userId, gameType);
        return UserGeneralStatsDTO.createFromDetails(details);
    }

    @Override
    public UserGeneralStatsDTO getStatsByChampion(Long userId, Long championId, String gameType) {
        checkUserExistence(userId);
        checkChampionExistence(championId);
        List<PlayerMatchDetailEntity> details = playerMatchDetailRepository.findByUserAndChampion(userId, championId, gameType);
        return UserGeneralStatsDTO.createFromDetails(details);
    }

    @Override
    public UserGeneralStatsDTO getStatsByRole(Long userId, String championRole, String gameType) {
        checkUserExistence(userId);
        RoleEntity role = getChampionRole(championRole);
        if ("ARAM".equalsIgnoreCase(gameType)) {
            throw new IllegalArgumentException("ARAM not supported for role stats");
        }
        List<PlayerMatchDetailEntity> details = playerMatchDetailRepository.findByUserAndRole(userId, role.getId(), gameType);
        return UserGeneralStatsDTO.createFromDetails(details);
    }

    @Override
    public UserGeneralStatsDTO getStatsByChampionAndRole(Long userId, Long championId, String championRole, String gameType) {
        checkUserExistence(userId);
        checkChampionExistence(championId);
        RoleEntity role = getChampionRole(championRole);
        if ("ARAM".equalsIgnoreCase(gameType)) {
            throw new IllegalArgumentException("ARAM not supported for role stats");
        }
        List<PlayerMatchDetailEntity> details = playerMatchDetailRepository.findByUserChampionAndRole(userId, championId, role.getId(), gameType);
        return UserGeneralStatsDTO.createFromDetails(details);
    }


    private RoleEntity getChampionRole(String role) {
        return roleRepository.findByRoleIgnoreCase(role)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find role " + role));
    }


    private void checkUserExistence (Long idUser)
    {
        Optional<UserEntity> optional = userRepository.findById(idUser);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+idUser);
    }
    private void checkChampionExistence (Long idChampion)
    {
        Optional<ChampionEntity> optional = championRepository.findById(idChampion);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion with id "+idChampion);
    }


}
