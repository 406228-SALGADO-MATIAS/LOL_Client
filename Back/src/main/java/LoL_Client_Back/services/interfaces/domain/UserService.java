package LoL_Client_Back.services.interfaces.domain;
import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.dtos.domain.UserMatchesDTO;
import LoL_Client_Back.dtos.enums.ServerOptions;
import LoL_Client_Back.models.domain.User;
import org.apache.catalina.Server;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    List<User> getAllUsers();
    UserLootMatchesDTO createUser(UserDTO userDTO, ServerOptions serverOption);
    UserMatchesDTO findByEmail (String email);
    List<UserMatchesDTO> findUsersByEmail(String email);
    List<UserMatchesDTO> findUsersByNickname(String nickname);
    List<UserMatchesDTO> findUsersByNicknameAndServer(String nickname, ServerOptions serverOptions);
    List<UserMatchesDTO> findUsersByUsername(String username);

}
