package LoL_Client_Back.controllers.transaction;

import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loot")
public class UserLootController {
    @Autowired
    private UserLootService userLootService;

    @GetMapping("/{idUser}")
    public ResponseEntity<UserLootDTO> getUserLootByUserId(@PathVariable Long idUser) {
        UserLootDTO loot = userLootService.findByUserId(idUser);
        return ResponseEntity.ok(loot);
    }

    @PostMapping("/create")
    public ResponseEntity<UserLootDTO> createUserLoot(@RequestParam Long idUser,
                                                      @RequestParam(required = false) Integer chests,
                                                      @RequestParam(required = false) Integer masterChests,
                                                      @RequestParam(required = false) Integer keys,
                                                      @RequestParam(required = false) Integer orangeEssence)
    {
        UserLootDTO created =
                userLootService.createUserLoot(idUser, chests, masterChests, keys, orangeEssence);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/openChests/{idUser}")
    public ResponseEntity<UserLootDTO> openChests(@PathVariable Long idUser,
                                                  @RequestParam(required = false) Integer chestsToOpen,
                                                  @RequestParam(required = false) Integer masterChestsToOpen)
    {
        UserLootDTO updatedLoot = userLootService.openChests(idUser, chestsToOpen, masterChestsToOpen);
        return ResponseEntity.ok(updatedLoot);
    }


}
