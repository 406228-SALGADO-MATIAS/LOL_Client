package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.dtos.domain.UserMatchesDTO;
import LoL_Client_Back.dtos.enums.ServerOptions;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.domain.UserRepository;
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
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ServerRegionRepository serverRegionRepository;
    @Autowired
    UserMatchesService userMatchesService;
    @Autowired
    UserLootService userLootService;

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
    public UserLootMatchesDTO createUser(UserDTO userDTO,ServerOptions serverOptions) {

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
        throw new EntityNotFoundException("Did not find user with "+email + " email");
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
    public List<UserMatchesDTO> findUsersByNicknameAndServer(String nickname, ServerOptions serverOptions) {

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
            return "El correo electrónico ya está en uso.";
        }

        if (userRepository.findByUsernameAndServer(userDTO.getUsername(), serverRegion).isPresent()) {
            return "El nombre de usuario ya está en uso en este servidor.";
        }

        if (userRepository.findByNicknameIgnoreCaseAndServer(userDTO.getNickname(), serverRegion).isPresent())
        {
            return "El apodo ya está en uso en este servidor.";
        }

        return "No se encontraron datos repetidos (esto no debería pasar si ya validaste antes).";
    }

    private ServerRegionEntity getServerByName(String serverName) {
        return serverRegionRepository.findByServer(serverName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "No se encontró el servidor con nombre: " + serverName));
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



