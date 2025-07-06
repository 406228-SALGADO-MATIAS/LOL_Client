package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.enums.ChampionRole;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.dtos.match.PlayerMatchDetailDTO;
import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.*;
import LoL_Client_Back.models.association.UserXChampion;
import LoL_Client_Back.models.domain.PlayerMatchDetail;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.reference.RankTier;
import LoL_Client_Back.models.reference.Role;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.domain.MatchRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.*;
import LoL_Client_Back.services.interfaces.domain.MatchService;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Array;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

    @Autowired
    ModelMapper mapper;
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    MatchRepository matchRepository;
    @Autowired
    MapRepository mapRepository;
    @Autowired
    ServerRegionRepository serverRegionRepository;
    @Autowired
    RankTierRepository rankTierRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    UserServiceImpl userService;
    @Autowired
    UserXChampionRepository userXChampionRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public MatchDTO createMatch(ServerOption serverOption, String gameMode, String map, String elo) {
        return null;
    }

    private MatchEntity buildNewMatch(ServerOption serverOption, String gameMode, String map, UserRankTier elo)
    {
        MatchEntity matchEntity = new MatchEntity();
        matchEntity.setDate(LocalDateTime.now());
        matchEntity.setDuration(generateDurationRandom());
        boolean mirrorChampions = false;

        if (gameMode.equals("RANKED")) {
            matchEntity.setMap(getMap(1L));
            matchEntity.setRanked(true);
        } else {
            if (map.equals("ARAM")) matchEntity.setMap(getMap(2L));
            else {
             matchEntity.setMap(getMap(1L));
                matchEntity.setRanked(false);
                mirrorChampions = true;
            }
        }
        matchEntity.setServerRegion(getServerByName(serverOption.getFullName()));
        //todo: set winner
        // matchEntity.setWinnerTeam(getRandomTeam());

        matchEntity.setPlayerDetails
                (buildPlayerMatchDetailEntityList(serverOption,elo,mirrorChampions));

        return null;
    }

    private MatchDTO buildMatchDTO(MatchEntity matchEntity) {
        //todo:
        return null;
    }

    private List<PlayerMatchDetailDTO> buildPlayerMatchDetailDTO(List<PlayerMatchDetailEntity> detailEntities) {
        //todo:
        return null;
    }


    private List<PlayerMatchDetailEntity> buildPlayerMatchDetailEntityList(ServerOption serverOption, UserRankTier elo,
                                                                           boolean mirrorChampions)
    {
        List<PlayerMatchDetailEntity> details = new ArrayList<>();

        //OBTAIN USERS FROM SERVER AND ELO
        List<UserMatchesDTO> usersFromServer = new ArrayList<>();
        if (elo == null) usersFromServer = userService.findUsersByRankAndServer(elo, serverOption);
        else usersFromServer = userService.findUsersByServer(serverOption);

        //filter users with no champions
        List<UserMatchesDTO> usersWithChampions =
                filterUsersWithNoChampions(usersFromServer);

        Pair<List<Long>, List<Long>> equipos = getRandomUserIds(usersWithChampions);

        List<Long> blueTeamIds = equipos.getFirst();
        List<Long> redTeamIds = equipos.getSecond();

        details = championSelectionTeams(blueTeamIds,redTeamIds,mirrorChampions);

        //todo : PlayerItems

        return details;
    }

    private List<PlayerMatchDetailEntity> championSelectionTeams(List<Long> blueTeam, List<Long> redTeam,
                                                                 boolean mirrorChampions)
    {
        List<ChampionEntity> pickedChampions = new ArrayList<>();
        List<PlayerMatchDetailEntity> detailList = new ArrayList<>();
        TeamEntity blueTeamEntity = getTeam(1L);
        TeamEntity redTeamEntity = getTeam(2L);
        List<RoleEntity> roles = roleRepository.findAll();
        int roleIndex = 0;
        //BLUE TEAM
        for (Long playerId : blueTeam){

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity
                    (blueTeamEntity,playerId,roles.get(roleIndex),pickedChampions);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }
        if (mirrorChampions) pickedChampions.clear();
        //RED TEAM
        roleIndex = 0;
        for (Long playerId : redTeam){

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity
                    (redTeamEntity,playerId,roles.get(roleIndex),pickedChampions);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }
        return detailList;
    }

    private PlayerMatchDetailEntity buildPlayerMatchDetailEntity(TeamEntity team ,Long userId, RoleEntity role,
                                                                 List<ChampionEntity> alreadySelectedChampions)
    {
        List<UserXChampionEntity> userChampionsBelonging =
                userXChampionRepository.findByUser_Id(userId);

        List<ChampionEntity> userChampionsForRole = new ArrayList<>();
        List<ChampionEntity> userChampions = new ArrayList<>();

        // if the user has champions
        if (!userChampionsBelonging.isEmpty()) {
            //look for champions with coincident role
            for (UserXChampionEntity u : userChampionsBelonging) {
                userChampions.add(u.getChampion()); //add to all the champions the user has

                // looking for champions with the role or role2
                if (u.getChampion().getRole().equals(role) || u.getChampion().getRole2().equals(role)) {
                    userChampionsForRole.add(u.getChampion());
                }
            }
        } else throw new RuntimeException
                ("The user with id " + userId +
                        "does not have ANY champions in posesion in order to build the match");

        PlayerMatchDetailEntity playerMatchDetail = new PlayerMatchDetailEntity();
        Collections.shuffle(userChampionsForRole);
        Collections.shuffle(userChampions);
        //if the user has champions for the role
        if (!userChampionsForRole.isEmpty()) {
            playerMatchDetail.setChampion
                    (getChampionNotSelected(userChampionsForRole,alreadySelectedChampions));
        }
        else {// if not, random champion the user has
            playerMatchDetail.setChampion(getChampionNotSelected(userChampions,alreadySelectedChampions));
        }
        playerMatchDetail.setUser(userChampionsBelonging.get(0).getUser());
        playerMatchDetail.setRole(role);
        playerMatchDetail.setTeam(team);
        return playerMatchDetail;
    }

    private List<ChampionEntity> getUniqueChampionsFromMatchDetails(List<PlayerMatchDetailEntity> details) {
        Set<ChampionEntity> uniqueChampions = new HashSet<>();

        for (PlayerMatchDetailEntity detail : details) {
            ChampionEntity champion = detail.getChampion();
            uniqueChampions.add(champion); // el Set evita duplicados automáticamente
        }
        return new ArrayList<>(uniqueChampions);
    }

    private TeamEntity getTeam (Long idTeam) {
        Optional<TeamEntity> optional =
                teamRepository.findById(idTeam);
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find team with id "+idTeam);
    }

    private Pair<List<Long>, List<Long>> getRandomUserIds(List<UserMatchesDTO> users) {
        if (users.size() < 10) throw new IllegalArgumentException
                ("At least 10 users are needed in order to build 2 teams.");

        Collections.shuffle(users);
        List<Long> selectedIds = users.subList(0, 10)
                .stream()
                .map(UserMatchesDTO::getUser_id)
                .collect(Collectors.toList());

        List<Long> team1 = selectedIds.subList(0, 5);
        List<Long> team2 = selectedIds.subList(5, 10);

        return Pair.of(team1, team2);
    }

    private List<UserMatchesDTO> filterUsersWithNoChampions(List<UserMatchesDTO> dtos) {
        List<Long> usersWithChampions = userXChampionRepository.findAllUserIdsWithChampions();

        List<UserMatchesDTO> filteredUsers = new ArrayList<>();

        for (UserMatchesDTO u : dtos) {
            if (usersWithChampions.contains(u.getUser_id())) {
                filteredUsers.add(u);
            }
        }
        return filteredUsers;
    }


    private ChampionEntity getChampionNotSelected(List<ChampionEntity> userChampions,
                                                  List<ChampionEntity> pickedChampions) {
        for (ChampionEntity uc : userChampions) {
            if (!pickedChampions.contains(uc)) {
                return uc;
            }
        }
        throw new RuntimeException("The user only has champions for selection that are already picked in the team");
    }

    public String generateDurationRandom() {
        int minutos = ThreadLocalRandom.current().nextInt(20, 51); // 20 a 50 inclusive
        int segundos = ThreadLocalRandom.current().nextInt(0, 60);  // 0 a 59 inclusive
        return String.format("%02d:%02d", minutos, segundos);
    }

    private MapEntity getMap(Long id) {
        Optional<MapEntity> optionalMap =
                mapRepository.findById(id);
        if (optionalMap.isPresent()) return optionalMap.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find map with id " + id);
    }

    private ServerRegionEntity getServerByName(String serverName) {
        return serverRegionRepository.findByServer(serverName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Did not find server named " + serverName));
    }

    private RankTierEntity getRankByName(String rankName) {
        Optional<RankTierEntity> optionalRankTier =
                rankTierRepository.findByRank(rankName);
        if (optionalRankTier.isPresent()) {
            return optionalRankTier.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user ranktier " + rankName);
    }

    private TeamEntity getRandomTeam() {
        long teamId = ThreadLocalRandom.current().nextBoolean() ? 1L : 2L;
        Optional<TeamEntity> teamOptional = teamRepository.findById(teamId);
        return teamOptional.orElseThrow(() ->
                new RuntimeException("No se encontró el equipo con ID: " + teamId));
    }
}
