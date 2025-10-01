package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.user.*;
import LoL_Client_Back.dtos.enums.MatchType;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.MatchRepository;
import LoL_Client_Back.repositories.domain.PlayerMatchDetailRepository;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.repositories.reference.RankTierRepository;
import LoL_Client_Back.repositories.reference.ServerRegionRepository;
import LoL_Client_Back.repositories.transaction.UserLootRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import LoL_Client_Back.services.interfaces.assocation.UserXSkinService;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import LoL_Client_Back.services.interfaces.domain.UserService;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ServerRegionRepository serverRegionRepository;
    @Autowired
    RankTierRepository rankTierRepository;
    @Autowired
    UserMatchesService userMatchesService;
    @Autowired
    UserMatchesRepository userMatchesRepository;
    @Autowired
    UserLootService userLootService;
    @Autowired
    UserXChampionRepository userXChampionRepository;
    @Autowired
    UserXSkinRepository userXSkinRepository;
    @Autowired
    UserXIconRepository userXIconRepository;
    @Autowired
    PlayerMatchDetailRepository playerMatchDetailRepository;
    @Autowired
    MatchRepository matchRepository;
    @Autowired
    UserLootRepository userLootRepository;
    @Autowired
    ProfileIconRepository profileIconRepository;
    @Autowired
    DTOBuilder dtoBuilder;
    @Autowired
    UserXChampionService userXChampionService;
    @Autowired
    UserXSkinService userXSkinService;

    @Override
    public UserMatchesDTO findById(Long id) {
        Optional<UserEntity> optUserEntity = userRepository.findById(id);
        if (optUserEntity.isPresent())
        {
            return dtoBuilder.buildUserMatchesDTO(optUserEntity.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+id);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findAll();
        for (UserEntity user : userEntities)
        {
            users.add(modelMapper.map(user,User.class));
        }
        return users;
    }

    @Override
    public UserLootMatchesDTO createUser(UserDTO userDTO, ServerOption serverOptions) {

        String email = userDTO.getEmail();
        validateEmail(email);
        String password = userDTO.getPassword();
        validatePassword(password);
        String username = userDTO.getUsername();
        String nickname = userDTO.getNickname();
        String serverName = serverOptions.getFullName();

        ServerRegionEntity serverRegionEntity =
                getServerByName(serverName);

        //Check existing user data
        List <UserEntity> optionalUserEntity =
                userRepository.findExistingUserData
                        (email, serverRegionEntity, username, nickname);

        if (optionalUserEntity.isEmpty()) {

            UserEntity userEntity =
                    buildNewUserEntity(userDTO,serverRegionEntity);

            UserEntity userEntitySaved = userRepository.save(userEntity);

            //parameter needed to build output dto

            UserMatches matches = userMatchesService.createUserMatches(userEntitySaved);
            UserLoot loot = userLootService.createUserLoot(userEntitySaved);
            User userSaved = modelMapper.map(userEntitySaved,User.class);

            userXChampionService.giveChampionsToUsersWithNoChampions();
            userXSkinService.giveSkinsToUsersWithout();
            Optional<ProfileIconEntity> optional =
                    profileIconRepository.findById(48L);
            if (optional.isPresent())
            {
                UserXIconEntity userXIcon = new UserXIconEntity();
                userXIcon.setAdquisitionDate(LocalDateTime.now());
                userXIcon.setIcon(optional.get());
                userXIcon.setUser(userEntitySaved);
                userXIconRepository.save(userXIcon);
            }

            return dtoBuilder.buildUserLootMatchesDTO(userSaved,loot,matches);

        } else {
            String errorMsg = checkRepeatedUserData(userDTO,serverRegionEntity);
            throw new ResponseStatusException(HttpStatus.CONFLICT,errorMsg);
        }

    }

    @Override
    public UserMatchesDTO findByEmail(String email) {

        Optional<UserEntity> optionalUserEntity
                = userRepository.findFirstByEmailIgnoreCase(email);

        if (optionalUserEntity.isPresent())
        {
            UserEntity userEntity = optionalUserEntity.get();

            return dtoBuilder.buildUserMatchesDTO
                    (userEntity);
        }
        throw new EntityNotFoundException("Did not find user with email "+email);
    }

    @Override
    public List<UserMatchesDTO> findUsersByEmail(String email) {
        List<UserEntity> usersEntity = userRepository.findByEmailIgnoreCaseContaining(email);

        return dtoBuilder.buildUserMatchesDTOList
                (usersEntity,"Did not find users with email: "+email);
    }

    @Override
    public List<UserProfileDTO> findUsersByNickname(String nickname) {

        List<UserEntity> usersEntity = userRepository.findByNicknameIgnoreCaseContaining(nickname);
        List<UserProfileDTO> dtos = new ArrayList<>();
        for (UserEntity user : usersEntity)
        {
            dtos.add(dtoBuilder.buildUserProfileDTO(user));
        }
        return  dtos;

    }

    @Override
    public List<UserProfileDTO> findUsersByNicknameAndServer(String nickname, ServerOption serverOptions) {

        ServerRegionEntity serverRegion =
                getServerByName(serverOptions.getFullName());

        List<UserEntity> usersEntity = userRepository.
                findByNicknameIgnoreCaseContainingAndServer(nickname,serverRegion);
        List<UserProfileDTO> dtos = new ArrayList<>();
        for (UserEntity user : usersEntity){
            dtos.add(dtoBuilder.buildUserProfileDTO(user));
        }

        return dtos;

    }

    @Override
    public List<UserMatchesDTO> findUsersByUsername(String username) {
        List<UserEntity> usersEntity =
                userRepository.findByUsernameIgnoreCaseContaining(username);
        return dtoBuilder.buildUserMatchesDTOList
                (usersEntity,"Did not find users with username ("+username+")");
    }

    @Override
    public UserMatchesDTO updateUser(Long id, UserDTO userDTO, ServerOption serverOption, UserRankTier rankTier) {

        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
        if (optionalUserEntity.isPresent())
        {
            UserEntity userFound= optionalUserEntity.get();
            ServerRegionEntity serverEntity = getServerByName(serverOption.getFullName());

            Optional<RankTierEntity> optionalRankTierEntity =
                    rankTierRepository.findByRank(rankTier.name());

            RankTierEntity rankTierEntity;

            if (rankTier.equals(UserRankTier.Unranked)) {
                rankTierEntity = null;
            } else {
                rankTierEntity = optionalRankTierEntity.orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Did not find ranktier (" + rankTier + ")")
                );
            }
            String errorMsg = checkRepeatedUserData(userDTO,serverEntity);
            if (errorMsg.equals("No repeated data")) {
                UserEntity updatedUser =
                        buildUpdatedUserEntity(userFound,userDTO,rankTierEntity,serverEntity);
                return dtoBuilder.buildUserMatchesDTO(userRepository.save(updatedUser));
            }
            throw new ResponseStatusException(HttpStatus.CONFLICT,errorMsg);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No user found by id "+id);
    }

    @Override
    public List<UserMatchesDTO> findUsersByRanktier(UserRankTier rankTierOption) {

         if (rankTierOption == UserRankTier.Unranked)
         {
             return dtoBuilder.buildUserMatchesDTOList(userRepository.findByRankIsNull(),
                    "Did not find users with rank tier "+rankTierOption.name());
         }
         Optional<RankTierEntity> optionalRankTier =
                 rankTierRepository.findByRank(rankTierOption.name());
         if (optionalRankTier.isPresent())
         {
             RankTierEntity rankTierEntity = optionalRankTier.get();
             return dtoBuilder.buildUserMatchesDTOList(userRepository.findByRank(rankTierEntity),
                     "Did not find users with rank tier "+rankTierOption.name());
         }
         throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find rank tier "+rankTierOption.name()+" in the database");
    }

    @Override
    public List<UserMatchesWinrateDTO> findUsersByWinrateAndServer
            (MatchType matchType,ServerOption serverOption,Double minWinrate) {

        List<UserMatchesEntity> entityList =
                getUserMatchesListByTypeAndServer(matchType,getServerByName(serverOption.getFullName()));
        if (!entityList.isEmpty())
        {
            List<UserMatchesWinrateDTO> dtoList = new ArrayList<>();
            for (UserMatchesEntity u : entityList)
            {
                dtoList.add(dtoBuilder.buildUserMatchesWinrateDTO(u,matchType));
            }
            List<UserMatchesWinrateDTO> dtoFilteredList =
                    filterByWinrate(reorderListByWinrate(dtoList,matchType),minWinrate);
            if (dtoFilteredList.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No users found with matchtype " + matchType + ", server " + serverOption + " and winrate > " + minWinrate);
            }
            return dtoFilteredList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find usermatches for matchtype "+matchType+" and server "+serverOption);

    }

    @Override
    public List<UserMatchesWinrateDTO> findUsersByMatchesPlayed(MatchType matchType, ServerOption serverOption, Integer minMatchesPlayed) {
        List<UserMatchesEntity> entityList =
                getUserMatchesListByTypeAndServer(matchType,getServerByName(serverOption.getFullName()));

        if (!entityList.isEmpty()){
            List<UserMatchesWinrateDTO> dtoList = new ArrayList<>();
            for (UserMatchesEntity u : entityList)
            {
                dtoList.add(dtoBuilder.buildUserMatchesWinrateDTO(u,matchType));
            }
            List<UserMatchesWinrateDTO> dtoFilteredList =
                    filterByMatchesPlayed(reorderListByMatchesPlayed(dtoList,matchType),minMatchesPlayed);
            if (dtoFilteredList.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No users found with matchtype " + matchType + ", server " + serverOption + " and that played at least " + minMatchesPlayed+" games");
            }
            return dtoFilteredList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find usermatches for matchtype "+matchType+" and server "+serverOption);
    }

    @Override
    public List<UserMatchesDTO> findUsersByRegistrationDate(LocalDateTime date) {
        List<UserEntity> userEntities = userRepository.
                findByRegistrationDateGreaterThanEqualOrderByRegistrationDateAsc(date);
        return dtoBuilder.buildUserMatchesDTOList
                (userEntities,"Did not find user with registration date" + date + " or higher");
    }

    @Override
    public List<UserMatchesDTO> findUsersByRankAndServer(UserRankTier rank, ServerOption server) {

        List<UserEntity> userEntityList = new ArrayList<>();
        if (rank == UserRankTier.Unranked) {
            userEntityList = userRepository.
                    findByRankIsNullAndServer(getServerByName(server.getFullName()));
        }
        else {
            userEntityList = userRepository.findByRankAndServer
                    (getRankByName(rank.name()),getServerByName(server.getFullName()));
        }
        return dtoBuilder.buildUserMatchesDTOList(userEntityList,
               "Did not find users on server "+server.name()+" that are "+rank.name());
    }

    @Override
    public List<UserMatchesDTO> findUsersByServer(ServerOption server) {
       return dtoBuilder.buildUserMatchesDTOList
               (userRepository.findByServer(getServerByName(server.getFullName())),
               "Did not find users on the server "+server.name());
    }

    @Override
    public LoginResponseDTO login(ServerOption serverOption, String username, String password) {
        ServerRegionEntity serverRegionEntity =
                getServerByName(serverOption.getFullName());
        Optional<UserEntity> optionalUser =
                userRepository.findByServerAndUsernameAndPassword(serverRegionEntity,username,password);

        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "The data provided does not match with any user account on the server "
                            +serverOption.getFullName());

        return new LoginResponseDTO(optionalUser.get().getId(),"Login successful");
    }

    @Transactional
    @Override
    public String delete(Long id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+id + " to delete");

        //User belongings deletions
        List<UserXChampionEntity> listUxC =
                userXChampionRepository.findByUser_Id(id);
        userXChampionRepository.deleteAll(listUxC);

        List<UserXSkinEntity> listUxS = userXSkinRepository.findByUser_Id(id);
        userXSkinRepository.deleteAll(listUxS);

        List<UserXIconEntity> listUxI = userXIconRepository.findByUser_Id(id);
        userXIconRepository.deleteAll(listUxI);

        //Delete Matches with user
        List<MatchEntity> matches =
                playerMatchDetailRepository.findMatchesByUserId(id);

        matchRepository.deleteAll(matches);

        //Delete user matches data
        Optional<UserMatchesEntity> optionalUserMatches =
                userMatchesRepository.findByUser(optionalUser.get());

        optionalUserMatches.ifPresent
                (userMatchesEntity -> userMatchesRepository.delete(userMatchesEntity));

        //Delete user loot
        Optional<UserLootEntity> optionalUserLoot = userLootRepository.findByUser_Id(id);
        optionalUserLoot.ifPresent
                (userLootEntity -> userLootRepository.delete(userLootEntity));

        //Delete user at last
        userRepository.deleteById(id);

        return "User with id "+id + " successfully deleted";
    }

    @Override
    public List<UserLootMatchesDTO> create100ForServer(ServerOption serverOption)
    {

        ServerRegionEntity serverRegion = getServerByName(serverOption.getFullName());
        List<RankTierEntity> ranks = rankTierRepository.findAll();

        List<String> usernames = new ArrayList<>(UserDataProvider.usernames());
        List<String> passwords = new ArrayList<>(UserDataProvider.passwords());
        List<String> emails = new ArrayList<>(UserDataProvider.emails());
        List<String> nicknames = new ArrayList<>(UserDataProvider.nicknames());

        // Shuffle
        Collections.shuffle(usernames);
        Collections.shuffle(passwords);
        Collections.shuffle(emails);
        Collections.shuffle(nicknames);

        List<UserEntity> users = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            UserEntity user = new UserEntity();
            user.setUsername(usernames.get(i));
            user.setPassword(passwords.get(i));
            user.setEmail(emails.get(i));
            user.setNickname(nicknames.get(i));
            user.setRegistrationDate(LocalDateTime.now().minusDays((long) (Math.random() * 365)));
            user.setBlueEssence(1000 + new Random().nextInt(4000));
            user.setRiotPoints(500 + new Random().nextInt(1500));
            user.setServer(serverRegion);

            // First 90 users have rank (10 to 10)
            if (i < 90) {
                int rankIndex = i / 10;
                user.setRank(ranks.get(rankIndex));
            } else {
                user.setRank(null);
            }

            users.add(user);
        }

        List<UserEntity> savedUsers = userRepository.saveAll(users);
        List<UserLootMatchesDTO> returnList = new ArrayList<>();
        for (UserEntity u : savedUsers)
        {
            UserMatches matches = userMatchesService.createUserMatches(u);
            UserLoot loot = userLootService.createUserLoot(u);
            User userSaved = modelMapper.map(u,User.class);

            returnList.add(dtoBuilder.buildUserLootMatchesDTO(userSaved,loot,matches));
        }
        return returnList;
    }

    @Override
    public UserProfileDTO getUserProfileById(Long id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+id);
        return dtoBuilder.buildUserProfileDTO(optionalUser.get());
    }

    @Override
    public UserProfileDTO updateUserIconImage(Long idUser, Long idIcon) {
        Optional<UserEntity> optionalUser = userRepository.findById(idUser);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+idUser);

        Optional<ProfileIconEntity> optional = profileIconRepository.findById(idIcon);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find icon with id "+idIcon);

        UserEntity updatedUser = optionalUser.get();
        updatedUser.setIcon(optional.get());

        return dtoBuilder.buildUserProfileDTO(userRepository.save(updatedUser));

    }

    @Override
    public List<UserProfileDTO> findUsersByNickNameAndRank(String nickname, UserRankTier rankTier) {
        List<UserEntity> users;

        if (rankTier == UserRankTier.Unranked) {
            // Usuarios sin rank
            users = userRepository.findByRankIsNull().stream()
                    .filter(u -> u.getNickname() != null && u.getNickname().toLowerCase().contains(nickname.toLowerCase()))
                    .toList();
        } else {
            // Usuarios con rank
            RankTierEntity rank = getRankByName(rankTier.name());
            users = userRepository.findByRank(rank).stream()
                    .filter(u -> u.getNickname() != null && u.getNickname().toLowerCase().contains(nickname.toLowerCase()))
                    .toList();
        }

        if (users.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find users with nickname containing '" + nickname + "' and rank " + rankTier.name());
        }

        return users.stream()
                .map(dtoBuilder::buildUserProfileDTO)
                .toList();
    }

    @Override
    public List<UserProfileDTO> findUsersByNicknameAndRankAndServer(String nickname, UserRankTier rankTier, ServerOption serverOption) {
        ServerRegionEntity server = getServerByName(serverOption.getFullName());
        List<UserEntity> users;

        if (rankTier == UserRankTier.Unranked) {
            // Usuarios sin rank, filtrados por server
            users = userRepository.findByRankIsNullAndServer(server).stream()
                    .filter(u -> u.getNickname() != null && u.getNickname().toLowerCase().contains(nickname.toLowerCase()))
                    .toList();
        } else {
            // Usuarios con rank, filtrados por server
            RankTierEntity rank = getRankByName(rankTier.name());
            users = userRepository.findByRankAndServer(rank, server).stream()
                    .filter(u -> u.getNickname() != null && u.getNickname().toLowerCase().contains(nickname.toLowerCase()))
                    .toList();
        }

        if (users.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find users with nickname containing '" + nickname + "', rank " + rankTier.name() + " on server " + serverOption.name());
        }

        return users.stream()
                .map(dtoBuilder::buildUserProfileDTO)
                .toList();
    }


    private RankTierEntity getRankByName(String rankname)
    {
        Optional<RankTierEntity> optionalRankTier =
                rankTierRepository.findByRank(rankname);
        if (optionalRankTier.isPresent())
        {
            return optionalRankTier.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user ranktier "+rankname);
    }
    private List<UserMatchesWinrateDTO> filterByWinrate(List<UserMatchesWinrateDTO> list, double minWinrate) {
        return list.stream()
                .filter(dto ->
                        (dto.getRankedWinrate() != null && dto.getRankedWinrate() >= minWinrate) ||
                                (dto.getNormalWinrate() != null && dto.getNormalWinrate() >= minWinrate) ||
                                (dto.getAramWinrate() != null && dto.getAramWinrate() >= minWinrate)
                )
                .collect(Collectors.toList());
    }

    private List<UserMatchesWinrateDTO> filterByMatchesPlayed(List<UserMatchesWinrateDTO> list, Integer minMatchesPlayed) {
        return list.stream()
                .filter(dto ->
                        (dto.getRankedsPlayed() != null && dto.getRankedsPlayed() >= minMatchesPlayed) ||
                                (dto.getNormalGamesPlayed() != null && dto.getNormalGamesPlayed() >= minMatchesPlayed) ||
                                (dto.getAramsPlayed() != null && dto.getAramsPlayed() >= minMatchesPlayed)
                )
                .collect(Collectors.toList());
    }

    private List<UserMatchesWinrateDTO> reorderListByWinrate (List<UserMatchesWinrateDTO> list, MatchType type)
    {
        switch (type) {
            case RANKED -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getRankedWinrate, Comparator.nullsLast(Comparator.naturalOrder())));
            case NORMAL -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getNormalWinrate, Comparator.nullsLast(Comparator.naturalOrder())));
            case ARAM -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getAramWinrate, Comparator.nullsLast(Comparator.naturalOrder())));
        }
        return list;
    }

    private List<UserMatchesWinrateDTO> reorderListByMatchesPlayed (List<UserMatchesWinrateDTO> list, MatchType type)
    {
        switch (type) {
            case RANKED -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getRankedsPlayed, Comparator.nullsLast(Comparator.naturalOrder())));
            case NORMAL -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getNormalGamesPlayed, Comparator.nullsLast(Comparator.naturalOrder())));
            case ARAM -> list.sort(Comparator.comparing
                    (UserMatchesWinrateDTO::getAramsPlayed, Comparator.nullsLast(Comparator.naturalOrder())));
        }
        return list;
    }

    private List<UserMatchesEntity> getUserMatchesListByTypeAndServer(MatchType matchType,
                                                                      ServerRegionEntity serverRegion)
    {
        List<UserMatchesEntity> list = new ArrayList<>();
        switch (matchType) {
            case ARAM -> list = userMatchesRepository.findByAramMatches(serverRegion);
            case NORMAL -> list = userMatchesRepository.findByNormalMatches(serverRegion);
            case RANKED -> list = userMatchesRepository.findByRankedMatches(serverRegion);
        }
        return list;
    }

    private UserEntity buildUpdatedUserEntity(UserEntity userToUpdate,UserDTO userDTO,
                                              RankTierEntity rank, ServerRegionEntity server)
    {
        UserEntity updtEntity = new UserEntity();

        updtEntity.setId(userToUpdate.getId());
        updtEntity.setUsername(userDTO.getUsername());
        updtEntity.setPassword(userDTO.getPassword());
        updtEntity.setEmail(userDTO.getEmail());
        updtEntity.setNickname(userDTO.getNickname());
        updtEntity.setRank(rank);
        updtEntity.setServer(server);
        updtEntity.setRegistrationDate(userToUpdate.getRegistrationDate());
        updtEntity.setRiotPoints(userToUpdate.getRiotPoints());
        updtEntity.setBlueEssence(userToUpdate.getBlueEssence());
        return updtEntity;
    }

    private UserEntity buildNewUserEntity (UserDTO userDTO,ServerRegionEntity server)
    {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setNickname(userDTO.getNickname());
        userEntity.setPassword(userDTO.getPassword());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setRegistrationDate(LocalDateTime.now());
        // for testing purposes:
        userEntity.setBlueEssence(18000);
        userEntity.setRiotPoints(4000);
        userEntity.setServer(server);
        return userEntity;
    }

    private String checkRepeatedUserData(UserDTO userDTO, ServerRegionEntity serverRegion) {


        if (userRepository.findFirstByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            return "The email ("+userDTO.getEmail()+") does already exist.";
        }

        if (userRepository.findFirstByUsernameAndServer(userDTO.getUsername(), serverRegion).isPresent()) {
            return "The username ("+userDTO.getUsername()+") is currently in use on the server ("+serverRegion.getServer()+")";
        }

        if (userRepository.findFirstByNicknameIgnoreCaseAndServer(userDTO.getNickname(), serverRegion).isPresent())
        {
            return "The nickname ("+userDTO.getNickname()+") is currently in use on the server ("+serverRegion.getServer()+")";
        }

        return "No repeated data";
    }

    private ServerRegionEntity getServerByName(String serverName) {
        return serverRegionRepository.findByServer(serverName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Did not find server named " + serverName));
    }

    private void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email cannot be null or empty.");
        }

        String trimmedEmail = email.trim();

        // Minimum length check (adjustable, this is a reasonable baseline)
        if (trimmedEmail.length() < 6) {
            throw new RuntimeException("Email is too short to be valid.");
        }

        // Basic structure checks
        if (!trimmedEmail.contains("@") || !trimmedEmail.contains(".")) {
            throw new RuntimeException("Email must contain '@' and a domain like '.com'.");
        }

        // Optional: check that the dot comes after the @
        int atIndex = trimmedEmail.indexOf("@");
        int lastDotIndex = trimmedEmail.lastIndexOf(".");

        if (lastDotIndex < atIndex) {
            throw new RuntimeException("Invalid domain structure in email.");
        }

        // Optional: enforce common domain endings
        if (!trimmedEmail.matches(".*\\.(com|net|org|edu|gov|io|co)$")) {
            throw new RuntimeException("Email must end with a valid domain like '.com'.");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password cannot be null or empty.");
        }

        String trimmedPassword = password.trim();

        // Minimum length
        if (trimmedPassword.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long.");
        }

        // At least one uppercase letter
        if (!trimmedPassword.matches(".*[A-Z].*")) {
            throw new RuntimeException("Password must contain at least one uppercase letter.");
        }

        // At least one special character
        if (!trimmedPassword.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            throw new RuntimeException("Password must contain at least one special character.");
        }
    }

    private String getUserFirstIcon (Long idUser)
    {
       List<UserXIconEntity> x =
               userXIconRepository.findByUser_Id(idUser);
       if (x.isEmpty())
           return "";
       return x.get(0).getIcon().getImage();
    }
}



