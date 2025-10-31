package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.user.*;
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
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = userService.login(
                request.getServer(),
                request.getUsername(),
                request.getPassword()
        );
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        String message = userService.delete(id);
        return ResponseEntity.ok(message);
    }

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

    @GetMapping("/getProfileById/{id}")
    public ResponseEntity<UserProfileDTO> getUserProfileById(@PathVariable Long id)
    {
        return ResponseEntity.ok(userService.getUserProfileById(id));
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
    public ResponseEntity<List<UserProfileDTO>> findUsersByNickname(@PathVariable String nickname)
    {
        return ResponseEntity.ok(userService.findUsersByNickname(nickname));
    }

    @GetMapping("/findUsers/nicknameAndserver")
    public ResponseEntity<List<UserProfileDTO>> findUsersByNicknameAndServer
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

    @GetMapping("/findUsers/Server")
    public ResponseEntity<List<UserMatchesDTO>> findUsersByServer
            (@RequestParam ServerOption option)
    {
        return ResponseEntity.ok((userService.findUsersByServer(option)));
    }

    @GetMapping("/findUsers/nickname/rankTier")
    public ResponseEntity<List<UserProfileDTO>> findUsersByNicknameAndRank(
            @RequestParam String nickname,
            @RequestParam UserRankTier rankTier
    ) {
        List<UserProfileDTO> users = userService.findUsersByNickNameAndRank(nickname, rankTier);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/findUsers/nickname/rankTierAndServer")
    public ResponseEntity<List<UserProfileDTO>> findUsersByNicknameRankAndServer(
            @RequestParam String nickname,
            @RequestParam UserRankTier rankTier,
            @RequestParam ServerOption server
    ) {
        List<UserProfileDTO> users = userService.findUsersByNicknameAndRankAndServer(nickname, rankTier, server);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<UserMatchesDTO> putUser (@PathVariable Long id,
                                                   @RequestBody UserDTO userDTO,
                                                   @RequestParam ServerOption serverOption,
                                                   @RequestParam UserRankTier rankTiers)
    {
        return ResponseEntity.ok(userService.updateUser(id,userDTO,serverOption,rankTiers));
    }

    @PostMapping("/100usersForServer")
    public ResponseEntity<List<UserLootMatchesDTO>> create100Users (@RequestParam ServerOption serverOption)
    {
        return ResponseEntity.ok(userService.create100ForServer(serverOption));
    }

    @PutMapping("/{idUser}/icon/{idIcon}")
    public ResponseEntity<UserProfileDTO> updateUserIcon(
            @PathVariable Long idUser,
            @PathVariable Long idIcon) {
        UserProfileDTO updatedUser = userService.updateUserIconImage(idUser, idIcon);
        return ResponseEntity.ok(updatedUser);
    }



}
