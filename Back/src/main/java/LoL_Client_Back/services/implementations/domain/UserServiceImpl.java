package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.user.UserDTO;
import LoL_Client_Back.dtos.user.UserLootMatchesDTO;
import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.dtos.user.UserMatchesWinrateDTO;
import LoL_Client_Back.dtos.enums.MatchType;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.RankTierRepository;
import LoL_Client_Back.repositories.reference.ServerRegionRepository;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import LoL_Client_Back.services.interfaces.domain.UserService;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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


    @Override
    public UserMatchesDTO findById(Long id) {
        Optional<UserEntity> optUserEntity = userRepository.findById(id);
        if (optUserEntity.isPresent())
        {
            return buildUserMatchesDTO(optUserEntity.get());
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
        String username = userDTO.getUsername();
        String nickname = userDTO.getNickname();
        String serverName = serverOptions.getFullName();

        ServerRegionEntity serverRegionEntity =
                getServerByName(serverName);

        //Check existing user data
        Optional<UserEntity> optionalUserEntity =
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
            return buildUserLootMatchesDTO(userSaved,loot,matches);

        } else {
            String errorMsg = checkRepeatedUserData(userDTO,serverRegionEntity);
            throw new ResponseStatusException(HttpStatus.CONFLICT,errorMsg);
        }

    }

    @Override
    public UserMatchesDTO findByEmail(String email) {

        Optional<UserEntity> optionalUserEntity
                = userRepository.findByEmailIgnoreCase(email);

        if (optionalUserEntity.isPresent())
        {
            UserEntity userEntity = optionalUserEntity.get();

            return buildUserMatchesDTO(userEntity);
        }
        throw new EntityNotFoundException("Did not find user with email "+email);
    }

    @Override
    public List<UserMatchesDTO> findUsersByEmail(String email) {
        List<UserEntity> usersEntity = userRepository.findByEmailIgnoreCaseContaining(email);

        return buildUserMatchesDTOList
                (usersEntity,"Did not find users with email: "+email);
    }

    @Override
    public List<UserMatchesDTO> findUsersByNickname(String nickname) {

        List<UserEntity> usersEntity = userRepository.findByNicknameIgnoreCaseContaining(nickname);

        return buildUserMatchesDTOList
                (usersEntity, "Did not find users with nickname: "+nickname);
    }

    @Override
    public List<UserMatchesDTO> findUsersByNicknameAndServer(String nickname, ServerOption serverOptions) {

        ServerRegionEntity serverRegion =
                getServerByName(serverOptions.getFullName());

        List<UserEntity> usersEntity = userRepository.
                findByNicknameIgnoreCaseContainingAndServer(nickname,serverRegion);

        return buildUserMatchesDTOList
                (usersEntity,"Did not find users with nickname: "+nickname+
                " and server: "+serverOptions.getFullName());
    }

    @Override
    public List<UserMatchesDTO> findUsersByUsername(String username) {
        List<UserEntity> usersEntity =
                userRepository.findByUsernameIgnoreCaseContaining(username);
        return buildUserMatchesDTOList
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
                return buildUserMatchesDTO(userRepository.save(updatedUser));
            }
            throw new ResponseStatusException(HttpStatus.CONFLICT,errorMsg);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No user found by id "+id);
    }

    @Override
    public List<UserMatchesDTO> findUsersByRanktier(UserRankTier rankTierOption) {

         if (rankTierOption == UserRankTier.Unranked)
         {
             return buildUserMatchesDTOList(userRepository.findByRankIsNull(),
                    "Did not find users with rank tier "+rankTierOption.name());
         }
         Optional<RankTierEntity> optionalRankTier =
                 rankTierRepository.findByRank(rankTierOption.name());
         if (optionalRankTier.isPresent())
         {
             RankTierEntity rankTierEntity = optionalRankTier.get();
             return buildUserMatchesDTOList(userRepository.findByRank(rankTierEntity),
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
                dtoList.add(buildUserMatchesWinrateDTO(u,matchType));
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
                dtoList.add(buildUserMatchesWinrateDTO(u,matchType));
            }
            List<UserMatchesWinrateDTO> dtoFilteredList =
                    filterByMatchesPlayed(reorderListByMatchesPlayed(dtoList,matchType),minMatchesPlayed);
            if (dtoFilteredList.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No users found with matchtype " + matchType + ", server " + serverOption + " and that played more than > " + minMatchesPlayed+" games");
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
        return buildUserMatchesDTOList
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
        return buildUserMatchesDTOList(userEntityList,
               "Did not find users on server "+server.name()+" that are "+rank.name());
    }

    private RankTierEntity getRankByName(String rankname)
    {
        Optional<RankTierEntity> optionalRankTier =
                rankTierRepository.findByRank(rankname);
        if (optionalRankTier.isPresent())
        {
            return optionalRankTier.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"DId not find user ranktier "+rankname);
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

    private UserMatchesWinrateDTO buildUserMatchesWinrateDTO(UserMatchesEntity uM, MatchType matchType)
    {
        UserMatchesWinrateDTO dto = new UserMatchesWinrateDTO();
        UserEntity u = uM.getUser();

        dto.setUser_id(u.getId());
        dto.setNickname(u.getNickname());
        dto.setRank(u.getRank().getRank());
        dto.setServer(u.getServer().getServer());

        switch (matchType) {
            case RANKED -> {
                dto.setRankedsPlayed(uM.getRankedsPlayed());
                dto.setRankedWins(uM.getRankedWins());
                dto.setRankedWinrate(calculateWinrate(uM.getRankedsPlayed(), uM.getRankedWins()));
            }
            case NORMAL -> {
                dto.setNormalGamesPlayed(uM.getNormalGamesPlayed());
                dto.setNormalWins(uM.getNormalWins());
                dto.setNormalWinrate(calculateWinrate(uM.getNormalGamesPlayed(), uM.getNormalWins()));
            }
            case ARAM -> {
                dto.setAramsPlayed(uM.getAramsPlayed());
                dto.setAramWins(uM.getAramWins());
                dto.setAramWinrate(calculateWinrate(uM.getAramsPlayed(), uM.getAramWins()));
            }
        }
        return dto;
    }

    private Double calculateWinrate(double gamesPlayed, double wins) {
        if (gamesPlayed == 0) {
            return 0.0;
        }
        return (wins / gamesPlayed) * 100;
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
        userEntity.setBlueEssence(6300);
        userEntity.setRiotPoints(300);
        userEntity.setServer(server);
        return userEntity;
    }

    private UserLootMatchesDTO buildUserLootMatchesDTO (User user, UserLoot loot, UserMatches matches)
    {
        UserLootMatchesDTO dto = new UserLootMatchesDTO();
        dto.setUser_id(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname());
        dto.setRegistrationDate(user.getRegistrationDate());
        if (user.getRank() != null)
        {
            dto.setRank(user.getRank().getRank());
        }
        dto.setServer(user.getServer().getServer());

        dto.setChests(loot.getChests());
        dto.setKeys(loot.getKeys());
        dto.setLoot_id(loot.getId());

        dto.setMatches_id(matches.getId());
        dto.setNormalGamesPlayed(matches.getNormalGamesPlayed());
        dto.setRankedsPlayed(matches.getRankedsPlayed());
        dto.setAramsPlayed(matches.getAramsPlayed());

        return dto;
    }

    private UserMatchesDTO buildUserMatchesDTO (UserEntity user) {

        UserMatchesDTO dto = new UserMatchesDTO();
        dto.setUser_id(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname());
        dto.setRegistrationDate(user.getRegistrationDate());

        if (user.getRank() != null)
        {
            dto.setRank(user.getRank().getRank());
        }

        dto.setServer(user.getServer().getServer());


        UserMatches userMatches =
                userMatchesService.findByUser
                        (modelMapper.map(user,UserEntity.class));

        dto.setMatches_id(userMatches.getId());
        dto.setNormalGamesPlayed(userMatches.getNormalGamesPlayed());
        dto.setRankedsPlayed(userMatches.getRankedsPlayed());
        dto.setAramsPlayed(userMatches.getAramsPlayed());

        return dto;
    }

    private String checkRepeatedUserData(UserDTO userDTO, ServerRegionEntity serverRegion) {


        if (userRepository.findByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            return "The email ("+userDTO.getEmail()+") does already exist.";
        }

        if (userRepository.findByUsernameAndServer(userDTO.getUsername(), serverRegion).isPresent()) {
            return "The username ("+userDTO.getUsername()+") is currently in use on the server ("+serverRegion.getServer()+")";
        }

        if (userRepository.findByNicknameIgnoreCaseAndServer(userDTO.getNickname(), serverRegion).isPresent())
        {
            return "The nickanem ("+userDTO.getNickname()+") is currently in use on the server ("+serverRegion.getServer()+")";
        }

        return "No repeated data";
    }

    private ServerRegionEntity getServerByName(String serverName) {
        return serverRegionRepository.findByServer(serverName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Did not find server named " + serverName));
    }

    private List<UserMatchesDTO> buildUserMatchesDTOList (List<UserEntity> usersEntity, String errorMsg)
    {
        List<UserMatchesDTO> userMatchesDTOS = new ArrayList<>();
        if (!usersEntity.isEmpty())
        {
            for (UserEntity u : usersEntity)
            {
                userMatchesDTOS.add(buildUserMatchesDTO(u));
            }
            return userMatchesDTOS;
        }
        throw new EntityNotFoundException(errorMsg);
    }
}



