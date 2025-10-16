package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.dtos.match.playerHistory.PlayerHistoryDTO;
import LoL_Client_Back.dtos.match.playerHistory.PlayerMatchDTO;
import LoL_Client_Back.dtos.match.playerMatch.UserMatchDTO;
import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.domain.*;
import LoL_Client_Back.entities.reference.*;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.domain.*;
import LoL_Client_Back.repositories.reference.*;
import LoL_Client_Back.services.implementations.domain.matchLogic.ChampionWinrateService;
import LoL_Client_Back.services.implementations.domain.matchLogic.DamageEstimatorService;
import LoL_Client_Back.services.implementations.domain.matchLogic.UserLpService;
import LoL_Client_Back.services.implementations.transaction.UserLootServiceImpl;
import LoL_Client_Back.services.interfaces.domain.MatchService;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    UserMatchesServiceImpl userMatchesService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DTOBuilder dtoBuilder;
    @Autowired
    DamageEstimatorService damageEstimatorService;
    @Autowired
    ChampionWinrateService championWinrateService;
    @Autowired
    ChampionRepository championRepository;
    @Autowired
    UserLootServiceImpl userLootService;
    @Autowired
    UserLpService userLpService;
    @Autowired
    PlayerMatchDetailRepository detailRepository;

    @Override
    public MatchDTO getMatchById(Long matchId, boolean showChampionImg, boolean showItemImg) {
        Optional<MatchEntity> optional =
                matchRepository.findById(matchId);
        if (optional.isPresent())
            return dtoBuilder.buildMatchDTO(optional.get(),showChampionImg,showItemImg);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find match id "+matchId);
    }

    @Override
    public List<MatchDTO> findMatchesByUserId(Long userId, boolean showChampionImg, boolean showItemImg) {

        List<MatchEntity> userMatches =
                matchRepository.findTop10MatchesByUserId(userId);
        if (!userMatches.isEmpty())
        {
            return dtoBuilder.buildMatchDTOList(userMatches,showChampionImg,showItemImg);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find matches for the user");
    }

    @Override
    public List<MatchDTO> getAllMatches(boolean showChampionImg, boolean showItemImg) {

        List<MatchEntity> matches =
                matchRepository.findAll();
        if (!matches.isEmpty())
        {
            return dtoBuilder.buildMatchDTOList(matches,showChampionImg,showItemImg);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find matches");
    }

    @Override
    public MatchDTO createMatch(ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                                boolean showChampion, boolean showItem)
    {
        MatchEntity match = buildMatchEntity(null,serverOption, gameMode, map, elo, null, null,null);
        MatchEntity matchSaved = matchRepository.save(match);
        //UPDATING USER MATCHES
        userMatchesService.updateUsers(matchSaved.getPlayerDetails());
        if (matchSaved.getRanked())
            userLpService.calculateUserRanks(matchSaved);
        MatchDTO dto = dtoBuilder.buildMatchDTO(matchSaved, showChampion, showItem);
        userLootService.giveRewardsToPlayersFromMatch(matchSaved,dto);
        championWinrateService.updateChampionWinrate(matchSaved);
        return dto;
    }

    @Override
    public MatchDTO createMatchForUser(Long userId, String gameMode, String map, boolean showChampion, boolean showItem)
    {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        UserEntity user;

        if (optionalUser.isPresent())
            user = optionalUser.get();
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + userId);

        ServerOption serverOption = getServerOptionFromEntity(user.getServer());
        UserRankTier rankTier = getUserRankTierFromEntity(user.getRank());

        MatchEntity match =
                buildMatchEntity
                        (null,serverOption, gameMode, map, rankTier, userId, null,null);

        MatchEntity matchSaved = matchRepository.save(match);
        //UPDATING USER MATCHES
        userMatchesService.updateUsers(matchSaved.getPlayerDetails());
        if (matchSaved.getRanked())
            userLpService.calculateUserRanks(matchSaved);
        MatchDTO dto = dtoBuilder.buildMatchDTO(matchSaved, showChampion, showItem);
        userLootService.giveRewardsToPlayersFromMatch(matchSaved,dto);
        championWinrateService.updateChampionWinrate(matchSaved);
        return dto;
    }

    @Override
    public MatchDTO createMatchForUserAndRole(Long userId, String role, String gameMode, boolean showChampion, boolean showItem) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        UserEntity user;

        if (optionalUser.isPresent())
            user = optionalUser.get();
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + userId);

        ServerOption serverOption = getServerOptionFromEntity(user.getServer());
        UserRankTier rankTier = getUserRankTierFromEntity(user.getRank());

        MatchEntity match =
                buildMatchEntity
                        (null,serverOption, gameMode, "SUMMONERS RIFT", rankTier, userId, role,null);

        MatchEntity matchSaved = matchRepository.save(match);
        //UPDATING USER MATCHES
        userMatchesService.updateUsers(matchSaved.getPlayerDetails());
        if (matchSaved.getRanked())
            userLpService.calculateUserRanks(matchSaved);
        MatchDTO dto = dtoBuilder.buildMatchDTO(matchSaved, showChampion, showItem);
        userLootService.giveRewardsToPlayersFromMatch(matchSaved,dto);
        championWinrateService.updateChampionWinrate(matchSaved);
        return dto;
    }


    @Override
    public MatchDTO createMatchForUserRoleAndChampion(Long userId, String role, Long championId, String gameMode, boolean showChampion, boolean showItem) {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        UserEntity user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + userId);
        }

        Optional<ChampionEntity> optionalChampion = championRepository.findById(championId);
        if (optionalChampion.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find champion with id " + championId);
        }

        ServerOption serverOption = getServerOptionFromEntity(user.getServer());
        UserRankTier rankTier = getUserRankTierFromEntity(user.getRank());

        MatchEntity match = buildMatchEntity(
                null,
                serverOption,
                gameMode,
                "SUMMONERS RIFT",
                rankTier,
                userId,
                role,
                championId // AQUÍ PASAMOS EL CHAMPION OPCIONAL
        );

        MatchEntity matchSaved = matchRepository.save(match);

        //UPDATING USER MATCHES
        userMatchesService.updateUsers(matchSaved.getPlayerDetails());
        if (matchSaved.getRanked())
            userLpService.calculateUserRanks(matchSaved);
        MatchDTO dto = dtoBuilder.buildMatchDTO(matchSaved, showChampion, showItem);
        userLootService.giveRewardsToPlayersFromMatch(matchSaved,dto);
        championWinrateService.updateChampionWinrate(matchSaved);
        return dto;
    }


    @Override
    public MatchDTO createMatchARAMForUserAndChampion(Long userId, Long championId,boolean showChampion, boolean showItem) {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        UserEntity user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + userId);
        }

        Optional<ChampionEntity> optionalChampion = championRepository.findById(championId);
        if (optionalChampion.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find champion with id " + championId);
        }

        ServerOption serverOption = getServerOptionFromEntity(user.getServer());
        UserRankTier rankTier = getUserRankTierFromEntity(user.getRank());

        MatchEntity match = buildMatchEntity(
                null,
                serverOption,
                "NORMAL",
                "ARAM",
                rankTier,
                userId,
                null,
                championId
        );

        MatchEntity matchSaved = matchRepository.save(match);

        //UPDATING USER MATCHES
        userMatchesService.updateUsers(matchSaved.getPlayerDetails());

        MatchDTO dto = dtoBuilder.buildMatchDTO(matchSaved, showChampion, showItem);
        userLootService.giveRewardsToPlayersFromMatch(matchSaved,dto);
        return dto;
    }

    @Override
    public MatchDTO updateMatchById(Long matchId, ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                                    Long optionalUserId, String optionalRole, boolean showChampion, boolean showItem)
    {
        Optional<MatchEntity> optionalMatch =
                matchRepository.findById(matchId);
        if (optionalMatch.isPresent())
        {
            MatchEntity matchToUpdate = optionalMatch.get();
            MatchEntity matchUpdated;
            //SPECIFIC USER ID RECEIVED
            if (optionalUserId != null)
            {
                Optional<UserEntity> optionalUser = userRepository.findById(optionalUserId);

                if (optionalUser.isPresent()) //USER EXISTS?
                {
                    UserEntity user = optionalUser.get();
                    ServerOption userServer = getServerOptionFromEntity(user.getServer());
                    UserRankTier userElo = getUserRankTierFromEntity(user.getRank());

                    //NO SPECIFIC ROLE RECEIVED
                    if (optionalRole == null || optionalRole.isBlank() || optionalRole.isEmpty())
                    {
                        matchUpdated = matchRepository.save
                                (buildMatchEntity(matchToUpdate,userServer,gameMode,map,userElo,optionalUserId,null,null));

                        userMatchesService.updateUsers(matchUpdated.getPlayerDetails()); //UPDATE USER MATCHES (wins & loses)
                        return dtoBuilder.buildMatchDTO(matchUpdated, showChampion,showItem);

                    }
                    else // WITH SPECIFIC ROLE (IGNORE parameter "map" && add "optionalRole")
                    {
                        matchUpdated = matchRepository.save
                                (buildMatchEntity(matchToUpdate,userServer,gameMode,"SUMMONERS RIFT",userElo,optionalUserId,optionalRole,null));

                        userMatchesService.updateUsers(matchUpdated.getPlayerDetails()); //UPDATE USER MATCHES (wins & loses)
                        return dtoBuilder.buildMatchDTO(matchUpdated, showChampion,showItem);
                    }
                }
                else  //USER DOES NOT EXIST
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find the user with id provided");
            }

            // NOT USER, THEN NO ROLE EITHER
            matchUpdated = matchRepository.save
                    (buildMatchEntity(matchToUpdate,serverOption,gameMode,map,elo,null,null,null));

            userMatchesService.updateUsers(matchUpdated.getPlayerDetails()); //UPDATE USER MATCHES (wins & loses)
            return dtoBuilder.buildMatchDTO(matchUpdated, showChampion,showItem);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find the match with id provided");
    }

    @Override
    public void delete(Long id) {
        Optional<MatchEntity> optional = matchRepository.findById(id);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find match id "+id + " to delete");
        matchRepository.delete(optional.get());

    }

    @Override
    public String generateRankedGames()
    {
        for (ServerOption server : ServerOption.values())
        {
            for (UserRankTier tier : UserRankTier.values())
            {
                // 4 games per tier on each server
                createMatch(server,"RANKED","SUMMONERS RIFT",tier,true,true);
                createMatch(server,"RANKED","SUMMONERS RIFT",tier,true,true);
                createMatch(server,"RANKED","SUMMONERS RIFT",tier,true,true);
                createMatch(server,"RANKED","SUMMONERS RIFT",tier,true,true);
            }
        }
        return "Successfully added matches to each Server. " +
                "4 matches per tier on each server = 40 per server = 160 matches in total";
    }

    @Override
    public PlayerHistoryDTO getUserMatchesHistory(Long idUser, String gameType, String optionalRole, String optionalStyle) {
        List<PlayerMatchDetailEntity> details;

        if (gameType == null && optionalRole == null) {
            details = detailRepository.findByUserId(idUser,null);
        }
        else if ("ARAM".equalsIgnoreCase(gameType)) {
            //no tiene rol
            details = detailRepository.findUserAramMatches(idUser);
        } else {
            // NORMAL o RANKED, opcional role
            details = detailRepository.findUserNormalOrRankedMatches(idUser,
                    gameType != null ? gameType.toUpperCase() : null,
                    optionalRole);
        }
        // style
        if (optionalStyle != null && !optionalStyle.isEmpty()) {
            details = details.stream()
                    .filter(detail -> determinePredominantStyle(detail).equalsIgnoreCase(optionalStyle))
                    .toList();
        }

        // return dto
        PlayerHistoryDTO history = new PlayerHistoryDTO();
        history.buildPlayerHistoryDTO(details);

        return history;
    }

    @Override
    public UserMatchDTO getUserMatch(Long idUser, Long idMatch) {

        Optional<UserEntity> optionalUser = userRepository.findById(idUser);
        Optional<MatchEntity> optionalMatch = matchRepository.findById(idMatch);

        if (optionalUser.isEmpty() || optionalMatch.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The user id "+idUser+", or  the match id" +idMatch+" do not exists");

        boolean isPlayerInMatch = false;
        for (PlayerMatchDetailEntity detail : optionalMatch.get().getPlayerDetails())
        {
            if (detail.getUser().getId().equals(idUser))
            {
                isPlayerInMatch = true;
                break;
            }
        }

        if (!isPlayerInMatch)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"The user with id "+idUser+" did not play on the match id "+idMatch);

        UserMatchDTO dto = new UserMatchDTO();
        dto.buildUserMatchDto(optionalMatch.get(),optionalUser.get().getId());
        return dto;
    }


    private String determinePredominantStyle(PlayerMatchDetailEntity detail) {
        if (detail.getItems() == null || detail.getItems().isEmpty()) return "Unknown";

        Map<String, Integer> styleCount = new HashMap<>();
        for (PlayerMatchItemEntity pItem : detail.getItems()) {
            if (pItem.getItem().getItemType() != null) {
                String style = pItem.getItem().getItemType().getStyle();
                styleCount.put(style, styleCount.getOrDefault(style, 0) + 1);
            }
        }

        if (styleCount.isEmpty()) return "Unknown";

        // Tomamos el style con mayor cantidad
        return styleCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .get()
                .getKey();
    }



    // Returns the match completed through calling other methods to assist it
    private MatchEntity buildMatchEntity(MatchEntity matchToUpdate,ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                                         Long optionalUserId, String optionalRole, Long optionalChampionId)
    {
        MatchEntity matchEntity;
        boolean update = false;
        //UPDATE?
        if (matchToUpdate != null) {
            matchEntity = matchToUpdate;
            update = true;

            //SAFE REMOVAL OF EACH ELEMENT OF THE COLLECTIONS IN MATCH AND DETAILS

            // We use an iterator to avoid ConcurrentModificationException
            Iterator<PlayerMatchDetailEntity> detailIterator = matchEntity.getPlayerDetails().iterator();
            while (detailIterator.hasNext())
            {
                PlayerMatchDetailEntity detail = detailIterator.next();

                // Safely remove each item
                Iterator<PlayerMatchItemEntity> itemIterator = detail.getItems().iterator();
                while (itemIterator.hasNext())
                {
                    PlayerMatchItemEntity item = itemIterator.next();
                    itemIterator.remove(); // Hibernate reads the remove action
                    item.setPlayerMatchDetail(null); // optional to be sure
                }

                // Now we delete the detail one by one
                detailIterator.remove(); // Hibernate reads the remove action
                detail.setMatch(null); // optional to be sure
            }

        }
        else {
            matchEntity = new MatchEntity();
        }

        // MATCH SETTERS
        matchEntity.setDate(LocalDateTime.now());
        matchEntity.setDuration(generateDurationRandom());
        boolean mirrorChampions = false;

        if (map.equals("ARAM")) {
            if (gameMode.equals("RANKED")) {
                throw new IllegalArgumentException("Cannot play Ranked on map ARAM");
            }
            matchEntity.setMap(getMap(2L));
            matchEntity.setRanked(false);
            mirrorChampions = true;
        }
        else if (map.equals("SUMMONERS RIFT")) {
            matchEntity.setMap(getMap(1L));
            if (gameMode.equals("RANKED")) {
                matchEntity.setRanked(true);
            }
            else {
                matchEntity.setRanked(false);
                mirrorChampions = true;
            }
        } else
            throw new IllegalArgumentException("Invalid map: only ARAM or SUMMONERS RIFT.");

        matchEntity.setServerRegion(getServerByName(serverOption.getFullName()));


        RoleEntity role = null;
        Long userId = null;

        if (optionalUserId != null) {
            userId = optionalUserId;
            if (optionalRole != null && !optionalRole.isEmpty()) {
                role = getRoleByName(optionalRole);
            }
        }

        if (update)
        {
            //SAFE FOR HIBERNATE, WE KEEP THE SAME COLLECTION, AND ADD TO IT THE NEW ITEMS ONE BY ONE
            // WE WON'T REPLACE THE LIST OF DETAILS NOR THE LIST OF ITEMS OF THE MATCH TO UPDATE
            // WE KEEP IT AND REPLACE EACH ELEMENT BY THE NEW ELEMENTS
            // SO THE COLLECTIONS ARE ALWAYS THE SAME OBJET THAT HIBERNATE DISTINGUISHES FOR THE CASCADE -> ORPHAN REMOVAL
            // AND CAN PROCEED WITH THE OPERATION

            List<PlayerMatchDetailEntity> newDetails =
                    buildPlayerMatchDetailEntityList(matchEntity, serverOption, elo, mirrorChampions, userId, role,optionalChampionId);

            for (PlayerMatchDetailEntity detail : newDetails) {
                matchEntity.getPlayerDetails().add(detail);
                detail.setMatch(matchEntity);
            }
        }
        else //Is a new MatchEntity
        {
            matchEntity.setPlayerDetails(
                    buildPlayerMatchDetailEntityList(matchEntity, serverOption, elo, mirrorChampions, userId, role,optionalChampionId));
        }
        damageEstimatorService.distributeDamage(matchEntity);
        return matchEntity;
    }

    //DELIVERS THE FULL LIST OF DETAILS WITH TEAMS, CHAMPS AND STATS
    private List<PlayerMatchDetailEntity> buildPlayerMatchDetailEntityList(MatchEntity match, ServerOption serverOption, UserRankTier elo, boolean mirrorChampions,
                                                                           Long optionalUserId, RoleEntity optionalRole, Long optionalChampionId)
    {
        List<UserMatchesDTO> usersFromServer;

        // if is ranked -> bring players with specific elo from the server
        //todo: si users from server < 10 -> incorporar los rangos aledaños
        if (match.getRanked()) {
            List<UserMatchesDTO> baseUsers = userService.findUsersByRankAndServer(elo, serverOption);
            usersFromServer = findUsersForRanked(baseUsers, elo, serverOption, 10);
        } else {
            //all users from the server
            usersFromServer = userService.findUsersByServer(serverOption);
        }

        if (usersFromServer.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no players in the server to build a match with ranked: " + match.getRanked() +
                            " , elo: " + elo.name() + " and server " + serverOption.getFullName());
        }
        //filter users with no champions
        List<UserMatchesDTO> usersWithChampions =
                filterUsersWithNoChampions(usersFromServer);

        if (usersWithChampions.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no players WITH CHAMPIONS to build a match with ranked: " + match.getRanked() +
                            " , elo: " + elo.name() + " and server " + serverOption.getFullName());
        }

        Pair<List<Long>, List<Long>> teams;

        // IN CASE THAT WE NEED TO INCORPORATE A SPECIFIC USER (ID) ON THE MATCH
        if (optionalUserId != null) {
            boolean userCanPlay = false;
            for (UserMatchesDTO u : usersWithChampions) {
                if (u.getUser_id().equals(optionalUserId)) {
                    userCanPlay = true; //THE USER HAS CHAMPIONS TO PLAY
                    break;
                }
            }
            if (userCanPlay)
                teams = getRandomUserIdsWithUser(usersWithChampions, optionalUserId);
            else
                throw new RuntimeException("The user with id" + optionalUserId + " does not have champions to build a match");
        } else
            teams = getRandomUserIds(usersWithChampions);

        List<Long> blueTeamIds = teams.getFirst();
        List<Long> redTeamIds = teams.getSecond();

        List<PlayerMatchDetailEntity> details;

        // Case: user provided with a role
        if (optionalUserId != null && optionalRole != null) {
            if (optionalChampionId != null) {
                // Fetch the champion entity from the repository
                Optional<ChampionEntity> optionalChampion = championRepository.findById(optionalChampionId);
                if (optionalChampion.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Did not find champion with id " + optionalChampionId);
                }

                // If champion is provided, assign it to the user with role
                details = championSelectionTeamsWithUserRoleAndChampion(
                        match, blueTeamIds, redTeamIds, mirrorChampions,
                        optionalUserId, optionalRole, optionalChampion.get());
            } else {
                // No champion provided, select automatically for user with role
                details = championSelectionTeamsWithUserAndRole(
                        match, blueTeamIds, redTeamIds, mirrorChampions,
                        optionalUserId, optionalRole);
            }
            sortByTeamAndRoles(details);
        }
        // Case: ARAM map and user + champion provided (no role)
        else if (optionalUserId != null && optionalChampionId != null && match.getMap().getId().equals(2L)) {
            Optional<ChampionEntity> optionalChampion = championRepository.findById(optionalChampionId);
            if (optionalChampion.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Did not find champion with id " + optionalChampionId);
            }

            // ARAM selection
            details = championSelectionTeamsWithUserAndChampion(
                    match, blueTeamIds, redTeamIds, mirrorChampions,
                    optionalUserId, optionalChampion.get());
        }
        // Default case: no user/champion info, random selection
        else {
            Collections.shuffle(blueTeamIds);
            Collections.shuffle(redTeamIds);
            details = championSelectionTeams(match, blueTeamIds, redTeamIds, mirrorChampions);
        }

        // Calculate additional match statistics
        calculateMatchStats(details);


        //SAFE FOR HIBERNATE, WE KEEP THE SAME COLLECTION, AND ADD TO IT THE NEW ITEMS ONE BY ONE
        for (PlayerMatchDetailEntity detail : details)
        {
            List<PlayerMatchItemEntity> newItems = buildPlayerMatchItemsEntity(detail);
            for (PlayerMatchItemEntity item : newItems)
            {
                detail.getItems().add(item);
                item.setPlayerMatchDetail(detail);
            }
        }
        return details;
    }

    public List<UserMatchesDTO> findUsersForRanked(List<UserMatchesDTO> baseList, UserRankTier rank, ServerOption serverOption, int minPlayers) {
        List<UserMatchesDTO> result = new ArrayList<>(baseList);
        Random random = new Random();

        UserRankTier[] ranks = UserRankTier.values();
        int currentIndex = rank != null ? rank.ordinal() : -1; // -1 = unranked

        // Lista temporal de candidatos adicionales
        List<UserMatchesDTO> candidates = new ArrayList<>();

        // Offset de búsqueda (1, 2, 3,...)
        int offset = 1;
        boolean finished = false;

        while (!finished && result.size() + candidates.size() < minPlayers) {
            List<UserMatchesDTO> plusList = new ArrayList<>();
            List<UserMatchesDTO> minusList = new ArrayList<>();

            int plusIndex = currentIndex + offset;
            int minusIndex = currentIndex - offset;

            // +offset
            if (plusIndex >= 0 && plusIndex < ranks.length) {
                try {
                    plusList = userService.findUsersByRankAndServer(ranks[plusIndex], serverOption);
                } catch (Exception e) {
                    // ignoramos rango sin usuarios
                }
            }

            // -offset
            if (minusIndex == -1) { // unranked
                try {
                    minusList = userService.findUsersByRankAndServer(null, serverOption);
                } catch (Exception e) {
                }
            } else if (minusIndex >= 0) {
                try {
                    minusList = userService.findUsersByRankAndServer(ranks[minusIndex], serverOption);
                } catch (Exception e) {
                }
            }

            // eliminar duplicados
            plusList.removeAll(result);
            plusList.removeAll(candidates);
            minusList.removeAll(result);
            minusList.removeAll(candidates);

            // agregar a candidatos
            candidates.addAll(plusList);
            candidates.addAll(minusList);

            // si ya no hay más rangos para buscar
            if ((plusList.isEmpty() && minusList.isEmpty()) || (plusIndex >= ranks.length && minusIndex < -1)) {
                finished = true;
            }

            offset++;
        }

        // Mezclar candidatos y añadir al resultado
        Collections.shuffle(candidates, random);
        result.addAll(candidates);

        // Rellenar hasta minPlayers con elementos aleatorios de la lista final
        while (result.size() < minPlayers && !result.isEmpty()) {
            int idx = random.nextInt(result.size());
            result.add(result.get(idx));
        }

        return result;
    }


    private List<PlayerMatchDetailEntity> championSelectionTeams(MatchEntity match, List<Long> blueTeam, List<Long> redTeam,
                                                                 boolean mirrorChampions) {
        List<ChampionEntity> pickedChampions = new ArrayList<>();
        List<PlayerMatchDetailEntity> detailList = new ArrayList<>();
        TeamEntity blueTeamEntity = getTeam(1L);
        TeamEntity redTeamEntity = getTeam(2L);
        List<RoleEntity> roles = roleRepository.findAll();
        int roleIndex = 0;
        //BLUE TEAM
        for (Long playerId : blueTeam) {

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity
                    (match, blueTeamEntity, playerId, roles.get(roleIndex), pickedChampions,null);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }
        if (mirrorChampions) pickedChampions.clear(); //IF MIRROR TRUE, CLEAR PICKED CHAMPIONS AFTER BLUE TEAM PICKED
        //RED TEAM
        roleIndex = 0;
        for (Long playerId : redTeam) {

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity
                    (match, redTeamEntity, playerId, roles.get(roleIndex), pickedChampions,null);

            detailList.add(detail);
            roleIndex++;
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        match.setWinnerTeam(championWinrateService.simulateMatchWinner(detailList));
        estimateTeamKillsByMatch(match);

        return detailList;
    }

    private List<PlayerMatchDetailEntity> championSelectionTeamsWithUserAndRole(MatchEntity match, List<Long> blueTeam, List<Long> redTeam,
                                                                              boolean mirrorChampions, Long userId, RoleEntity fixedRole) {

        List<ChampionEntity> pickedChampions = new ArrayList<>();
        List<PlayerMatchDetailEntity> detailList = new ArrayList<>();
        TeamEntity blueTeamEntity = getTeam(1L);
        TeamEntity redTeamEntity = getTeam(2L);
        List<RoleEntity> roles = roleRepository.findAll();

        // BLUE TEAM
        List<RoleEntity> blueRoles = new ArrayList<>(roles);

        for (Long playerId : blueTeam)
        {
            RoleEntity assignedRole;

            if (playerId.equals(userId)) {
                assignedRole = fixedRole;
                blueRoles.remove(fixedRole);
            } else {
                assignedRole = blueRoles.remove(0);
            }

            PlayerMatchDetailEntity detail =
                    buildPlayerMatchDetailEntity(match, blueTeamEntity, playerId, assignedRole, pickedChampions,null);

            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        if (mirrorChampions) pickedChampions.clear();

        // RED TEAM
        List<RoleEntity> redRoles = new ArrayList<>(roles);

        for (Long playerId : redTeam) {
            RoleEntity assignedRole;

            if (playerId.equals(userId)) {
                assignedRole = fixedRole;
                redRoles.remove(fixedRole);
            } else {
                assignedRole = redRoles.remove(0);
            }

            PlayerMatchDetailEntity detail =
                    buildPlayerMatchDetailEntity(match, redTeamEntity, playerId, assignedRole, pickedChampions,null);

            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        match.setWinnerTeam(championWinrateService.simulateMatchWinner(detailList));
        estimateTeamKillsByMatch(match);

        return detailList;
    }

    private List<PlayerMatchDetailEntity> championSelectionTeamsWithUserRoleAndChampion(
            MatchEntity match,
            List<Long> blueTeam,
            List<Long> redTeam,
            boolean mirrorChampions,
            Long userId,
            RoleEntity fixedRole,
            ChampionEntity optionalChampion // NUEVO
    ) {
        List<PlayerMatchDetailEntity> detailList = new ArrayList<>();
        List<ChampionEntity> pickedChampions = new ArrayList<>();
        TeamEntity blueTeamEntity = getTeam(1L);
        TeamEntity redTeamEntity = getTeam(2L);
        List<RoleEntity> roles = roleRepository.findAll();

        // BLUE TEAM
        List<RoleEntity> blueRoles = new ArrayList<>(roles);
        for (Long playerId : blueTeam) {
            RoleEntity assignedRole = playerId.equals(userId) ? fixedRole : blueRoles.remove(0);
            if (playerId.equals(userId)) blueRoles.remove(fixedRole);

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity(
                    match, blueTeamEntity, playerId, assignedRole, pickedChampions,
                    playerId.equals(userId) ? optionalChampion : null
            );

            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        if (mirrorChampions) pickedChampions.clear();

        // RED TEAM
        List<RoleEntity> redRoles = new ArrayList<>(roles);
        for (Long playerId : redTeam) {
            RoleEntity assignedRole = playerId.equals(userId) ? fixedRole : redRoles.remove(0);
            if (playerId.equals(userId)) redRoles.remove(fixedRole);

            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity(
                    match, redTeamEntity, playerId, assignedRole, pickedChampions,
                    playerId.equals(userId) ? optionalChampion : null
            );

            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        match.setWinnerTeam(championWinrateService.simulateMatchWinner(detailList));
        estimateTeamKillsByMatch(match);

        return detailList;
    }

    private List<PlayerMatchDetailEntity> championSelectionTeamsWithUserAndChampion(
            MatchEntity match,
            List<Long> blueTeam,
            List<Long> redTeam,
            boolean mirrorChampions,
            Long userId,
            ChampionEntity optionalChampion
    ) {
        List<PlayerMatchDetailEntity> detailList = new ArrayList<>();
        List<ChampionEntity> pickedChampions = new ArrayList<>();
        TeamEntity blueTeamEntity = getTeam(1L);
        TeamEntity redTeamEntity = getTeam(2L);

        // BLUE TEAM
        for (Long playerId : blueTeam) {
            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity(
                    match,
                    blueTeamEntity,
                    playerId,
                    null, // sin rol
                    pickedChampions,
                    playerId.equals(userId) ? optionalChampion : null
            );
            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        if (mirrorChampions) pickedChampions.clear();

        // RED TEAM
        for (Long playerId : redTeam) {
            PlayerMatchDetailEntity detail = buildPlayerMatchDetailEntity(
                    match,
                    redTeamEntity,
                    playerId,
                    null, // sin rol
                    pickedChampions,
                    playerId.equals(userId) ? optionalChampion : null
            );
            detailList.add(detail);
            pickedChampions = getUniqueChampionsFromMatchDetails(detailList);
        }

        match.setWinnerTeam(championWinrateService.simulateMatchWinner(detailList));
        estimateTeamKillsByMatch(match);

        return detailList;
    }



    // BUILDS A SINGLE DETAIL
    private PlayerMatchDetailEntity buildPlayerMatchDetailEntity(
            MatchEntity match,
            TeamEntity team,
            Long userId,
            RoleEntity role,
            List<ChampionEntity> alreadySelectedChampions,
            ChampionEntity optionalChampion // NUEVO
    ) {
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
                if (role != null && (u.getChampion().getRole().equals(role) ||
                        (u.getChampion().getRole2() != null && u.getChampion().getRole2().equals(role))))
                {
                    userChampionsForRole.add(u.getChampion());
                }
            }
        } else throw new RuntimeException
                ("The user with id " + userId +
                        " does not have ANY champions in posesion in order to build the match");

        PlayerMatchDetailEntity playerMatchDetail = new PlayerMatchDetailEntity();
        Collections.shuffle(userChampionsForRole);
        Collections.shuffle(userChampions);

        ChampionEntity champion = null;

        // optional champion:
        if (optionalChampion != null) {
            if (!userChampions.contains(optionalChampion)) {
                throw new RuntimeException("The user does not have the champion selected: "+optionalChampion.getName());
            }
            if (alreadySelectedChampions.contains(optionalChampion)) {
                throw new RuntimeException("The champion :"+optionalChampion.getName()+" has been already selected");
            }
            champion = optionalChampion;
        } else {
            // not optional champion
            if (match.getMap().getId().equals(2L)) {
                champion = getChampionNotSelected(userChampions, alreadySelectedChampions);
            } else if (!userChampionsForRole.isEmpty() && match.getMap().getId().equals(1L)) {
                champion = getChampionNotSelected(userChampionsForRole, alreadySelectedChampions);
            } else {
                champion = getChampionNotSelected(userChampions, alreadySelectedChampions);
            }

            if (champion == null) {
                //try again with random
                champion = getChampionNotSelected(userChampions, alreadySelectedChampions);
                if (champion == null) {
                    throw new RuntimeException("The user only has champions that are already selected");
                }
            }
        }

        playerMatchDetail.setChampion(champion);
        playerMatchDetail.setUser(userChampionsBelonging.get(0).getUser());
        if (match.getMap().getId().equals(1L) && role != null) {
            playerMatchDetail.setRole(role); //Roles are only for map 1, not ARAM
        }
        playerMatchDetail.setTeam(team);
        playerMatchDetail.setMatch(match);
        return playerMatchDetail;
    }


    private List<PlayerMatchItemEntity> buildPlayerMatchItemsEntity (PlayerMatchDetailEntity detail)
    {
        ChampionEntity champion = detail.getChampion();

        ChampionStyleEntity championStyle1 = champion.getStyle();
        List<ItemEntity> itemsStyle1 = itemRepository.findByItemType(championStyle1);

        List<ItemEntity> itemsToPick;

        //The champion has more than 1 way to build himself
        if (champion.getStyle2() != null)
        {
            ChampionStyleEntity championStyle2 = champion.getStyle2();
            List<ItemEntity> itemsStyle2 = itemRepository.findByItemType(championStyle2);
            List<ItemEntity> itemsStyleMix = itemRepository.findByItemTypeOrItemType2(championStyle1,championStyle2);
            itemsToPick = getRandomItemPoolByStyle(itemsStyle1,itemsStyleMix,itemsStyle2);
        }
        else
            itemsToPick = itemsStyle1;

        List<ItemEntity> itemsPicked = new ArrayList<>();

        int playerGold = detail.getTotalGold();

        int itemsAmount = 0;

        List<PlayerMatchItemEntity> playerItems = new ArrayList<>();
        Collections.shuffle(itemsToPick);

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
                                    int teamKills, int enemyKills, int teamCreaturesKilled)
    {
        Random random = new Random();
        boolean isAram = allDetails.get(0).getMatch().getMap().getId().equals(2L);

        // FILTER players by TEAM
        List<PlayerMatchDetailEntity> teamPlayers = allDetails.stream()
                .filter(p -> p.getTeam().getId().equals(team.getId()))
                .toList();

        // KILLS
        double[] killRatios = {0.16, 0.21, 0.25, 0.27, 0.10}; // PERCENTAGE -> distribution of KILLS to each player from teamKills
        int[] killsAssigned = new int[5];
        int killSum = 0;

        for (int i = 0; i < 5; i++) {
            killsAssigned[i] = (int) Math.round(teamKills * killRatios[i]);
            killSum += killsAssigned[i];
        }

        assignExcessToRandom(killsAssigned, teamKills - killSum, random);

        // DEATHS
        int[] deathRatios = {18, 22, 20, 21, 19}; // PERCENTAGE -> distribution of DEATHS to each player from enemyKills
        int[] deathsAssigned = new int[5];
        int deathSum = 0;

        for (int i = 0; i < 5; i++) {
            deathsAssigned[i] = (int) Math.round(enemyKills * (deathRatios[i] / 100.0));
            deathSum += deathsAssigned[i];
        }

        assignExcessToRandom(deathsAssigned, enemyKills - deathSum, random);

        // ASSISTS
        double assistMultiplier = 0.75 + (new Random().nextDouble() * 0.30); // 0.75 a 1.05
        int assistCap = (int) Math.round(teamKills * assistMultiplier);
        double[] assistRatios = {0.15, 0.22, 0.18, 0.15, 0.50}; // PERCENTAGE -> distribution of ASSISTS to each player from teamKills
        int[] assistsAssigned = new int[5];

        for (int i = 0; i < 5; i++) {
            assistsAssigned[i] = (int) Math.round(assistCap * assistRatios[i]);
        }

        // CREATURES / FARM
        double[] creatureRatios = {0.23, 0.20, 0.20, 0.27, 0.10};
        int[] creaturesAssigned = new int[5];
        int creatureSum = 0;

        for (int i = 0; i < 5; i++) {
            creaturesAssigned[i] = (int) Math.round(teamCreaturesKilled * creatureRatios[i]);
            creatureSum += creaturesAssigned[i];
        }

        int creatureDiff = teamCreaturesKilled - creatureSum;
        if (creatureDiff != 0) {
            creaturesAssigned[3] += creatureDiff; // the EXCESS of farm assigned to the ADC
        }

        // FINAL: KDA, FARM and GOLD ASSIGNATION
        for (int i = 0; i < 5; i++) {
            PlayerMatchDetailEntity player = teamPlayers.get(i);
            player.setKills(killsAssigned[i]);
            player.setDeaths(deathsAssigned[i]);
            player.setAssists(assistsAssigned[i]);
            player.setCreaturesKilled(creaturesAssigned[i]);

            int goldFromKills = killsAssigned[i] * 400;
            int goldFromCreatures = creaturesAssigned[i] * 35;
            int totalGold = goldFromKills + goldFromCreatures;

            if (player.getRole() != null && "SUPPORT".equals(player.getRole().getRole())) {
                totalGold = (int) Math.round(totalGold * 1.6); // 60% más
            }
            if (isAram) totalGold = totalGold* 3; //DOUBLE GOLD FOR ARAM GAMES
            player.setTotalGold(totalGold);
        }
    }

    private void assignExcessToRandom(int[] array, int diff, Random random) {
        if (diff != 0) {
            int index = random.nextInt(array.length);
            if (diff < 0) {
                // Avoid negative values
                int maxRestar = Math.min(Math.abs(diff), array[index]);
                array[index] -= maxRestar;
            } else {
                array[index] += diff;
            }
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
        // between 20 and 25 creeps per minute are killed lets say
        int minCreaturesPerMinute = 20;
        int maxCreaturesPerMinute = 25;

        int totalCreatures = 0;
        for (int i = 0; i < totalMinutes; i++) {
            totalCreatures += ThreadLocalRandom.current().nextInt(minCreaturesPerMinute, maxCreaturesPerMinute + 1);
        }
        if (isAram) {
            totalCreatures /= 4;
        }
        return totalCreatures;
    }

    public void estimateTeamKillsByMatch(MatchEntity match) {
        if (match == null) return;

        Random random = new Random();

        int blueKills = random.nextInt(36) + 25; // 30–60
        int redKills = random.nextInt(36) + 25;  // 30–60

        // If aram, +20% kills
        boolean isAram = match.getMap() != null && match.getMap().getId().equals(2L);
        if (isAram) {
            blueKills = (int) Math.round(blueKills * 1.2);
            redKills = (int) Math.round(redKills * 1.2);
        }

        // Bonus kills for winner (10–20 kills extra)
        if (match.getWinnerTeam() != null) {
            int bonus = random.nextInt(9) + 7; // 8–14inclusive

            if (match.getWinnerTeam().getId().equals(1L)) {
                blueKills += bonus;
            } else {
                redKills += bonus;
            }
        }

        match.setBlueTeamKills(blueKills);
        match.setRedTeamKills(redKills);
    }

    private void sortByTeamAndRoles(List<PlayerMatchDetailEntity> details) {
        TeamEntity blueTeam = getTeam(1L);
        TeamEntity redTeam = getTeam(2L);

        List<RoleEntity> roles = roleRepository.findAll();

        List<PlayerMatchDetailEntity> sorted = new ArrayList<>();

        for (TeamEntity team : List.of(blueTeam, redTeam)) {
            for (RoleEntity role : roles) {
                details.stream()
                        .filter(d -> d.getTeam().equals(team) && d.getRole().equals(role))
                        .findFirst()
                        .ifPresent(sorted::add);
            }
        }
        details.clear();
        details.addAll(sorted);
    }

    private List<ItemEntity> getRandomItemPoolByStyle(List<ItemEntity> style1, List<ItemEntity> mix, List<ItemEntity> style2) {
        int roll = new Random().nextInt(10) + 1;
        if (roll <= 5) {
            return style1;
        } else if (roll <= 8) {
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

    private Pair<List<Long>, List<Long>> getRandomUserIdsWithUser(List<UserMatchesDTO> users, Long idUser) {
        if (users.size() < 9) {
            throw new IllegalArgumentException("At least 9 additional users are needed (10 total with fixed user).");
        }

        // Randomizing
        Collections.shuffle(users);

        // Pick 9 random
        List<Long> randomUserIds = users.stream()
                .map(UserMatchesDTO::getUser_id)
                .filter(id -> !id.equals(idUser)) // Por si llega a estar incluido
                .limit(9)
                .toList();

        List<Long> team1 = new ArrayList<>();
        List<Long> team2 = new ArrayList<>();

        // Pick a random team for the user (idUser)
        boolean userGoesToTeam1 = new Random().nextBoolean();
        if (userGoesToTeam1) {
            team1.add(idUser);
        } else {
            team2.add(idUser);
        }

        // Complete the teams with the other 9 players
        for (int i = 0; i < randomUserIds.size(); i++) {
            if ((userGoesToTeam1 && team1.size() < 5) || (!userGoesToTeam1 && team2.size() >= 5)) {
                team1.add(randomUserIds.get(i));
            } else {
                team2.add(randomUserIds.get(i));
            }
        }

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
                                                  List<ChampionEntity> pickedChampions)
    {
        for (ChampionEntity uc : userChampions) {
            if (!pickedChampions.contains(uc)) {
                return uc;
            }
        }
        return null;
    }

    public String generateDurationRandom() {
        int minutes = ThreadLocalRandom.current().nextInt(20, 51); // 20 - 50
        int seconds = ThreadLocalRandom.current().nextInt(0, 60);  // 0 - 59
        return String.format("%02d:%02d", minutes, seconds);
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

    private RoleEntity getRoleByName(String roleName) {
        return roleRepository.findByRoleIgnoreCase(roleName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Did not find role named " + roleName));
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

    private ServerOption getServerOptionFromEntity(ServerRegionEntity entity) {
        String serverName = entity.getServer();
        for (ServerOption option : ServerOption.values()) {
            if (option.getFullName().equals(serverName)) {
                return option;
            }
        }
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "No matching ServerOption for server name: " + serverName);
    }

    private UserRankTier getUserRankTierFromEntity(RankTierEntity entity) {
        if (entity == null) {
            return UserRankTier.Unranked;
        }

        try {
            return UserRankTier.valueOf(entity.getRank());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No matching UserRankTier for rank: " + entity.getRank());
        }
    }



}
