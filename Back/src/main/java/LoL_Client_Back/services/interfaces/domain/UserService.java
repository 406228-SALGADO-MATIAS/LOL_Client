package LoL_Client_Back.services.interfaces.domain;
import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.models.domain.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    List<User> getAllUsers();
    UserLootMatchesDTO createUser(UserDTO userDTO);
}
