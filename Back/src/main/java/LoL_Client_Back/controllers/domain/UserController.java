package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.services.interfaces.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getUsers ()
    {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserLootMatchesDTO> createUser(@RequestBody UserDTO dto)
    {
        UserLootMatchesDTO user = userService.createUser(dto);
        return ResponseEntity.ok(user);
    }

}
