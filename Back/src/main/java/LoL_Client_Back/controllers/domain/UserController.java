package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.dtos.domain.UserMatchesDTO;
import LoL_Client_Back.dtos.enums.ServerOptions;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.services.interfaces.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getUsers ()
    {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/findUsers/email/{email}")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByEmail(@PathVariable String email)
    {
        return ResponseEntity.ok(userService.findUsersByEmail(email));
    }

    @GetMapping("/findUsers/nickname/{nickname}")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByNickname(@PathVariable String nickname)
    {
        return ResponseEntity.ok(userService.findUsersByNickname(nickname));
    }

    @GetMapping("/findUsers/nickname&&server")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByNicknameAndServer
            (@RequestParam String nickname,
             @RequestParam ServerOptions serverOption)
    {
        return ResponseEntity.ok(userService.findUsersByNicknameAndServer(nickname,serverOption));
    }


    @GetMapping("/findUsers/username/{username}")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByUsername(@PathVariable String username)
    {
        return ResponseEntity.ok(userService.findUsersByUsername(username));
    }


    @GetMapping("/getUser/email/{email}")
    public ResponseEntity<UserMatchesDTO> getUserByEmail(@PathVariable String email)
    {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserLootMatchesDTO> createUser(@RequestBody UserDTO dto,
                                                         @RequestParam ServerOptions serverOption)
    {
        UserLootMatchesDTO user = userService.createUser(dto,serverOption);
        return ResponseEntity.ok(user);
    }

}
