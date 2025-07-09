package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.dtos.match.PlayerMatchDetailDTO;
import LoL_Client_Back.dtos.match.PlayerMatchItemDTO;
import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.ItemEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.*;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.domain.ItemRepository;
import LoL_Client_Back.repositories.domain.MatchRepository;
import LoL_Client_Back.repositories.reference.*;
import LoL_Client_Back.services.interfaces.domain.MatchService;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

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
    @Autowired
    ItemRepository itemRepository;

    @Override
    public MatchDTO createMatch(ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                                boolean showChampion, boolean showItem)
    {
        MatchEntity match = buildMatchEntity(serverOption,gameMode,map,elo);
        MatchEntity matchSaved = matchRepository.save(match);
        return buildMatchDTO(matchSaved,showChampion,showItem);
    }

    //MATCH DTO
    private MatchDTO buildMatchDTO(MatchEntity matchEntity,
                                   boolean showChampion, boolean showItem)
    {
        MatchDTO matchDTO = customMapper.map(matchEntity,MatchDTO.class);
        matchDTO.setServerRegion(matchEntity.getServerRegion().getServer());
        matchDTO.setMap(matchEntity.getMap().getMap());
        matchDTO.setWinnerTeam(matchEntity.getWinnerTeam().getTeamColor());
        //details
        matchDTO.setPlayers(buildPlayerMatchDetailDTO
                (matchEntity.getPlayerDetails(),showChampion,showItem));
        return matchDTO;
    }

    //DETAIL DTO
    private List<PlayerMatchDetailDTO> buildPlayerMatchDetailDTO(List<PlayerMatchDetailEntity> detailEntities,
                                                                 boolean showChampion, boolean showItem)
    {
        List<PlayerMatchDetailDTO> dtoList = new ArrayList<>();

        for (PlayerMatchDetailEntity detail : detailEntities)
        {
            PlayerMatchDetailDTO dto = customMapper.map(detail,PlayerMatchDetailDTO.class);

            dto.setMatchId(detail.getMatch().getId());
            dto.setTeamMember(detail.getTeam().getTeamColor());
            dto.setRole(detail.getRole().getRole());
            dto.setChampion(detail.getChampion().getName());
            dto.setUserNickname(detail.getUser().getNickname());

            if (showChampion)
                dto.setImageUrlChampion(detail.getChampion().getImage());

            dto.setItems(buildPlayerMatchItemsDTOList(detail.getItems(),showItem));

            dtoList.add(dto);
        }
        return dtoList;
    }

    //ITEMS DTO
    private List<PlayerMatchItemDTO> buildPlayerMatchItemsDTOList (List<PlayerMatchItemEntity> playerItems,
                                                                   boolean showItem)
    {
        List<PlayerMatchItemDTO> dtoList = new ArrayList<>();
        for (PlayerMatchItemEntity playerItem : playerItems)
        {
            PlayerMatchItemDTO dto = new PlayerMatchItemDTO();
            dto.setId(playerItem.getId());
            dto.setIdItem(playerItem.getItem().getId());
            dto.setIdMatchDetail(playerItem.getPlayerMatchDetail().getId());
            dto.setItemName(playerItem.getItem().getName());
            if (showItem)
                dto.setImageUrlItem(playerItem.getItem().getImage());
            dtoList.add(dto);
        }
        return dtoList;
    }

    private MatchEntity buildMatchEntity(ServerOption serverOption, String gameMode, String map, UserRankTier elo)
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
        //todo: calcular de verdad un equipo ganador
        matchEntity.setWinnerTeam(getRandomTeam());

        estimateTeamKillsByMatch(matchEntity);
        matchEntity.setPlayerDetails
                (buildPlayerMatchDetailEntityList(matchEntity,serverOption,elo,mirrorChampions));
        return matchEntity;
    }

    //CREA LA LISTA DE DETALLES
    private List<PlayerMatchDetailEntity> buildPlayerMatchDetailEntityList(MatchEntity match,ServerOption serverOption,
                                                                           UserRankTier elo, boolean mirrorChampions)
    {
        List<UserMatchesDTO> usersFromServer;

        // if is ranked -> bring players with specific elo from the server
        if (match.getRanked()) {
            usersFromServer = userService.findUsersByRankAndServer(elo, serverOption);
        }
        else {
            //all users from the server
            usersFromServer = userService.findUsersByServer(serverOption);
        }

        //filter users with no champions
        List<UserMatchesDTO> usersWithChampions =
                filterUsersWithNoChampions(usersFromServer);

        Pair<List<Long>, List<Long>> equipos = getRandomUserIds(usersWithChampions);

        List<Long> blueTeamIds = equipos.getFirst();
        List<Long> redTeamIds = equipos.getSecond();

        List<PlayerMatchDetailEntity> details =
                championSelectionTeams(match,blueTeamIds,redTeamIds,mirrorChampions);

        calculateMatchStats(details);

        for (PlayerMatchDetailEntity detail : details){
            detail.setItems(buildPlayerMatchItemsEntity(detail));
        }
        return details;
    }

    private List<PlayerMatchDetailEntity> championSelectionTeams(MatchEntity match,List<Long> blueTeam, List<Long> redTeam,
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
                    (match,blueTeamEntity,playerId,roles.get(roleIndex),pickedChampions);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }
        if (mirrorChampions) pickedChampions.clear();
        //RED TEAM
        roleIndex = 0;
        for (Long playerId : redTeam){

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity
                    (match,redTeamEntity,playerId,roles.get(roleIndex),pickedChampions);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }
        return detailList;
    }

    // BUILDS A SINGLE DETAIL
    private PlayerMatchDetailEntity buildPlayerMatchDetailEntity(MatchEntity match, TeamEntity team ,Long userId,
                                                                RoleEntity role, List<ChampionEntity> alreadySelectedChampions)
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
                if (u.getChampion().getRole().equals(role) ||
                        //OR [role2 distinct null AND role2 = role wanted
                        (u.getChampion().getRole2() != null && u.getChampion().getRole2().equals(role)))
                {
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
        playerMatchDetail.setMatch(match);
        return playerMatchDetail;
    }

    private List<PlayerMatchItemEntity> buildPlayerMatchItemsEntity (PlayerMatchDetailEntity detail)
    {
        ChampionEntity champion = detail.getChampion();
        ChampionStyleEntity championStyle1 = champion.getStyle();
        ChampionStyleEntity championStyle2 = champion.getStyle2();

        List<ItemEntity> itemsStyle1 = itemRepository.findByItemType(championStyle1);
        List<ItemEntity> itemsStyle2 = itemRepository.findByItemType(championStyle2);
        List<ItemEntity> itemsStyleMix = itemRepository.findByItemTypeOrItemType2(championStyle1,championStyle2);

        List<ItemEntity> itemsPicked = new ArrayList<>();
        List<ItemEntity> itemsToPick = getRandomItemPoolByStyle(itemsStyle1,itemsStyleMix,itemsStyle2);

        int playerGold = detail.getTotalGold();

        int itemsAmount = 0;
        List<PlayerMatchItemEntity> playerItems = new ArrayList<>();
        // todo : revisar
        for (ItemEntity item : itemsToPick){

            if (itemsAmount < 6)
            {
                //Didn't buy the item already and has enough gold to purchase it
                if (!itemsPicked.contains(item) && playerGold >= item.getCost())
                {
                    PlayerMatchItemEntity playerMatchItem = new PlayerMatchItemEntity();
                    playerMatchItem.setItem(item);
                    playerMatchItem.setPlayerMatchDetail(detail);
                    playerItems.add(playerMatchItem);
                    itemsPicked.add(item);
                    itemsAmount++;
                    playerGold -= item.getCost();
                }
                else continue;
            }
            else break;
        }
        return playerItems;
    }

    // Receives the detail list and estimates the kills, gold and creatures killed per team
    public void calculateMatchStats(List<PlayerMatchDetailEntity> details)
    {
        if (details == null || details.isEmpty()) return;

        MatchEntity match = details.get(0).getMatch();
        int blueKills = match.getBlueTeamKills();
        int redKills = match.getRedTeamKills();

        String matchDuration = match.getDuration();

        boolean isAram = details.get(0).getMatch().getMap().getId().equals(2L);
        int blueCreaturesKilled = estimateCreaturesKilledByTeam(matchDuration,isAram);
        int redCreaturesKilled = estimateCreaturesKilledByTeam(matchDuration,isAram);

        //blue team
        distributeTeamStats(details,getTeam(1L),blueKills,redKills,blueCreaturesKilled);
        //red team
        distributeTeamStats(details,getTeam(2L),redKills,blueKills,redCreaturesKilled);

    }
    // Builds the logic for the stats distribution for each member of the team, given a list of 10 players/details
    // It works one team per time, and receives the stats to implement, and calculates the gold of each player too
    // after the distribution
    public void distributeTeamStats(List<PlayerMatchDetailEntity> allDetails, TeamEntity team,
                                    int teamKills,
                                    int enemyKills,
                                    int teamCreaturesKilled)
    {
        int remainingKills = teamKills;
        int remainingDeaths = enemyKills;
        int remainingCreatures = teamCreaturesKilled;

        Map<PlayerMatchDetailEntity, Integer> creatureDistribution = new HashMap<>();
        Random random = new Random();

        for (PlayerMatchDetailEntity player : allDetails) {
            //Filter players/details by teamEntity
            if (!player.getTeam().getId().equals(team.getId())) {
                continue;
            }

            // KILLS
            int assignedKills = 0;
            if (remainingKills > 0) {
                assignedKills = random.nextInt(remainingKills + 1);
                remainingKills -= assignedKills;
            }
            player.setKills(assignedKills);

            // DEATHS
            int assignedDeaths = 0;
            if (remainingDeaths > 0) {
                assignedDeaths = random.nextInt(remainingDeaths + 1);
                remainingDeaths -= assignedDeaths;
            }
            player.setDeaths(assignedDeaths);

            // ASSISTS
            int assists = teamKills > 0 ? random.nextInt(teamKills + 1) : 0;
            player.setAssists(assists);

            // Pre-asignar criaturas estimadas
            int creatureGuess = remainingCreatures > 0 ? random.nextInt(remainingCreatures + 1) : 0;
            creatureDistribution.put(player, creatureGuess);
        }

        // Ordenar primero por si es support, luego por criaturaGuess
        List<Map.Entry<PlayerMatchDetailEntity, Integer>> sorted = new ArrayList<>(creatureDistribution.entrySet());
        sorted.sort((a, b) -> {
            boolean aSupport = isSupport(a.getKey());
            boolean bSupport = isSupport(b.getKey());
            if (aSupport && !bSupport) return -1;
            if (!aSupport && bSupport) return 1;
            return Integer.compare(a.getValue(), b.getValue());
        });

        // Asignar criaturas y oro
        for (int i = 0; i < sorted.size(); i++) {
            PlayerMatchDetailEntity player = sorted.get(i).getKey();
            int creatureCount;
            if (i == sorted.size() - 1) {
                creatureCount = remainingCreatures;
            } else {
                creatureCount = random.nextInt(remainingCreatures + 1);
                remainingCreatures -= creatureCount;
            }

            player.setCreaturesKilled(creatureCount);

            int goldFromCreatures = creatureCount * 35;
            int goldFromKills = player.getKills() * 400;
            player.setTotalGold(goldFromCreatures + goldFromKills);
        }
    }

    public int estimateCreaturesKilledByTeam(String matchDuration, boolean isAram) {
        String[] parts = matchDuration.split(":");
        int totalMinutes;

        if (parts.length == 2) {
            totalMinutes = Integer.parseInt(parts[0]);
        } else if (parts.length == 3) {
            totalMinutes = Integer.parseInt(parts[0]) * 60 + Integer.parseInt(parts[1]);
        } else {
            throw new IllegalArgumentException("Duration format not recognized: " + matchDuration);
        }
        // between 25 and 32 creeps per minute are killed lets say
        int minCreaturesPerMinute = 25;
        int maxCreaturesPerMinute = 32;

        int totalCreatures = 0;
        for (int i = 0; i < totalMinutes; i++) {
            totalCreatures += ThreadLocalRandom.current().nextInt(minCreaturesPerMinute, maxCreaturesPerMinute + 1);
        }
        if (isAram) {
            totalCreatures /= 4;
        }
        return totalCreatures;
    }

    private boolean isSupport(PlayerMatchDetailEntity player) {
        RoleEntity role = player.getRole();
        return role != null && (role.getId() == 5L || "SUPPORT".equalsIgnoreCase(role.getRole()));
    }

    public void estimateTeamKillsByMatch(MatchEntity match) {
        if (match == null) return;

        Random random = new Random();

        // Kills between 20 and 80 per team
        int blueKills = random.nextInt(61) + 20; // 20 a 80 inclusive
        int redKills = random.nextInt(61) + 20;

        // if ARAM is the map/game mode, totalKills x1.5
        boolean isAram = match.getMap() != null && match.getMap().getId().equals(2L);
        if (isAram) {
            blueKills = (int) Math.round(blueKills * 1.5);
            redKills = (int) Math.round(redKills * 1.5);
        }

        match.setBlueTeamKills(blueKills);
        match.setRedTeamKills(redKills);
    }


    private List<ItemEntity> getRandomItemPoolByStyle(List<ItemEntity> style1, List<ItemEntity> mix, List<ItemEntity> style2) {
        int roll = new Random().nextInt(10) + 1;
        if (roll >= 1 && roll <= 5) {
            return style1;
        } else if (roll >= 6 && roll <= 8) {
            return mix;
        } else {
            return style2;
        }
    }

    private List<ChampionEntity> getUniqueChampionsFromMatchDetails(List<PlayerMatchDetailEntity> details) {
        Set<ChampionEntity> uniqueChampions = new HashSet<>();

        for (PlayerMatchDetailEntity detail : details) {
            ChampionEntity champion = detail.getChampion();
            uniqueChampions.add(champion); // set avoids duplicates
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

    //todo : revisar
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
                new RuntimeException("Did not find team with id: " + teamId));
    }
}
