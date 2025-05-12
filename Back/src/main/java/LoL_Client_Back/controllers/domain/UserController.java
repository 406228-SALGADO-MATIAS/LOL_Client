package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.domain.UserDTO;
import LoL_Client_Back.dtos.domain.UserLootMatchesDTO;
import LoL_Client_Back.dtos.domain.UserMatchesDTO;
import LoL_Client_Back.dtos.domain.UserMatchesWinrateDTO;
import LoL_Client_Back.dtos.enums.MatchType;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.services.interfaces.domain.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<UserLootMatchesDTO> createUser(@RequestBody UserDTO dto,
                                                         @RequestParam ServerOption serverOption)
    {
        UserLootMatchesDTO user = userService.createUser(dto,serverOption);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<UserMatchesDTO> getUserById(@PathVariable Long id)
    {
        return ResponseEntity.ok(userService.findById(id));
    }

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

    @GetMapping("/findUsers/nicknameAndserver")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByNicknameAndServer
            (@RequestParam String nickname,
             @RequestParam ServerOption serverOption)
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

    @GetMapping("/findUsers/rankTier")
    public ResponseEntity<List<UserMatchesDTO>> getUsersByRankTier
            (@RequestParam UserRankTier rankTierOption)
    {
        return ResponseEntity.ok(userService.findUsersByRanktier(rankTierOption));
    }

    @GetMapping("/findUsers/matchtypeAndserver/winrate")
    public ResponseEntity<List<UserMatchesWinrateDTO>> findUsersByWinrateAndServer
            (@RequestParam MatchType matchType, @RequestParam ServerOption server,
             @RequestParam(required = false, defaultValue = "0") Double minWinrate)
    {
        return ResponseEntity.ok(userService.findUsersByWinrateAndServer(matchType,server,minWinrate));
    }

    @GetMapping("/findUsers/matchtypeAndserver/matchesplayed")
    public ResponseEntity<List<UserMatchesWinrateDTO>> findUsersByMatchesPlayed
            (@RequestParam MatchType matchType, @RequestParam ServerOption server,
             @RequestParam(required = false, defaultValue = "0") Integer minMatchesPlayed)
    {
        return ResponseEntity.ok(userService.findUsersByMatchesPlayed(matchType,server,minMatchesPlayed));
    }

    @GetMapping("/findUsers/afterDate")
    public ResponseEntity<List<UserMatchesDTO>> findUsersAfterDate
            (@Parameter(name = "fromDate",
                    example = "2021-01-01T20:45:00",
                    description = "Minimun registration date (format ISO: yyyy-MM-ddTHH:mm:ss)")
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
             LocalDateTime fromDate)
    {
        return ResponseEntity.ok(userService.findUsersByRegistrationDate(fromDate));
    }

    @GetMapping("/findUsers/rankTierAndServer")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByRanktierAndServer
            (@RequestParam UserRankTier rankTierOption,
             @RequestParam ServerOption serverOption)
    {
        return ResponseEntity.ok(userService.findUsersByRankAndServer(rankTierOption,serverOption));
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<UserMatchesDTO> putUser (@PathVariable Long id,
                                                   @RequestBody UserDTO userDTO,
                                                   @RequestParam ServerOption serverOption,
                                                   @RequestParam UserRankTier rankTiers)
    {
        return ResponseEntity.ok(userService.updateUser(id,userDTO,serverOption,rankTiers));
    }



}
