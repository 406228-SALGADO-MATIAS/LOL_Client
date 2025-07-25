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
    public ResponseEntity<UserLootDTO> getUserLootByUserId(@PathVariable Long idUser,
                                                           @RequestParam (defaultValue = "true") boolean showInactives) {
        UserLootDTO loot = userLootService.findByUserId(idUser,showInactives);
        return ResponseEntity.ok(loot);
    }
    @PostMapping("/create")
    public ResponseEntity<UserLootDTO> createUserLoot(@RequestParam Long idUser,
                                                      @RequestParam(required = false) Integer chests,
                                                      @RequestParam(required = false) Integer masterChests,
                                                      @RequestParam(required = false) Integer keys,
                                                      @RequestParam(required = false) Integer orangeEssence,
                                                      @RequestParam (defaultValue = "true") boolean showInactives)
    {
        UserLootDTO created =
                userLootService.createUserLoot(idUser, chests, masterChests, keys, orangeEssence,showInactives);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    @PutMapping("/openChests/{idUser}")
    public ResponseEntity<UserLootDTO> openChests(@PathVariable Long idUser,
                                                  @RequestParam(required = false) Integer chestsToOpen,
                                                  @RequestParam(required = false) Integer masterChestsToOpen,
                                                  @RequestParam (defaultValue = "true") boolean showInactives)
    {
        UserLootDTO updatedLoot = userLootService.openChests(idUser, chestsToOpen, masterChestsToOpen, showInactives);
        return ResponseEntity.ok(updatedLoot);
    }
    @PutMapping("")
    public ResponseEntity<UserLootDTO> updateUserLoot(@RequestParam Long idUser,
                                                      @RequestParam(required = false) Integer chests,
                                                      @RequestParam(required = false) Integer masterChests,
                                                      @RequestParam(required = false) Integer keys,
                                                      @RequestParam(required = false) Integer orangeEssence,
                                                      @RequestParam (defaultValue = "true") boolean showInactives)
    {
        UserLootDTO updated =
                userLootService.updateUserLoot(idUser, chests, masterChests, keys, orangeEssence,showInactives);
        return ResponseEntity.ok(updated);
    }
    @PutMapping("/unlockOrRefund/champion/{idLootChampion}")
    public ResponseEntity<UserLootDTO> unlockOrRefundChampionLoot(@PathVariable Long idLootChampion,
                                                                  @RequestParam (defaultValue = "true") boolean enchant,
                                                                  @RequestParam(defaultValue = "true") boolean showInactives)
    {
        UserLootDTO result = userLootService.unlockOrRefundChampionLoot(idLootChampion, enchant, showInactives);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/unlockOrRefund/skin/{idLootSkin}")
    public ResponseEntity<UserLootDTO> unlockOrRefundSkinLoot(@PathVariable Long idLootSkin,
                                                                  @RequestParam (defaultValue = "true")boolean enchant,
                                                                  @RequestParam(defaultValue = "true") boolean showInactives)
    {
        UserLootDTO result = userLootService.unlockOrRefundSkinLoot(idLootSkin, enchant, showInactives);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/unlockOrRefund/icon/{idLootIcon}")
    public ResponseEntity<UserLootDTO> unlockOrRefundIconLoot(@PathVariable Long idLootIcon,
                                                                  @RequestParam (defaultValue = "true") boolean enchant,
                                                                  @RequestParam(defaultValue = "true") boolean showInactives)
    {
        UserLootDTO result = userLootService.unlockOrRefundIconLoot(idLootIcon, enchant, showInactives);
        return ResponseEntity.ok(result);
    }


}
