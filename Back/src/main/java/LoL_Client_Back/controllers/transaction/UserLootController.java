package LoL_Client_Back.controllers.transaction;

import LoL_Client_Back.dtos.loot.NewItemDTO;
import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userLoot")
@CrossOrigin(origins = {"http://localhost:3000", "https://lol-client-front.onrender.com"})
public class UserLootController {
    @Autowired
    private UserLootService userLootService;

    @GetMapping("/{idUser}")
    public ResponseEntity<UserLootDTO> getUserLootByUserId(@PathVariable Long idUser,
                                                           @RequestParam (defaultValue = "true") boolean showInactives) {
        UserLootDTO loot = userLootService.findByUserId(idUser,showInactives);
        return ResponseEntity.ok(loot);
    }
    @GetMapping("/byLootInventory/{id}")
    public UserLootDTO findByUserLootId(@PathVariable Long id,
                                        @RequestParam
                                        @Parameter(schema = @Schema(allowableValues = {"SKINS", "CHAMPIONS", "ICONS"}))
                                        String userLootType,
                                        @RequestParam(defaultValue = "true") boolean showInactives)
    {
        return userLootService.findByLootInventoryId(id, userLootType, showInactives);
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
                                                  @RequestParam (defaultValue = "true") boolean showInactives
                                                 )
    {
        UserLootDTO updatedLoot = userLootService.openChests(idUser, chestsToOpen, masterChestsToOpen,showInactives);
        return ResponseEntity.ok(updatedLoot);
    }

    @PutMapping("/openChests/normal/{idUser}")
    public ResponseEntity<NewItemDTO> openNormalChest(@PathVariable Long idUser) {
        NewItemDTO reward = userLootService.openNormalChest(idUser);
        return ResponseEntity.ok(reward);
    }

    @PutMapping("/openChests/master/{idUser}")
    public ResponseEntity<NewItemDTO> openMasterChest(@PathVariable Long idUser) {
        NewItemDTO reward = userLootService.openMasterChest(idUser);
        return ResponseEntity.ok(reward);
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
    public ResponseEntity<NewItemDTO> unlockOrRefundChampionLoot(@PathVariable Long idLootChampion,
                                                                 @RequestParam (defaultValue = "true") boolean enchant)
    {
        NewItemDTO result = userLootService.unlockOrRefundChampionLoot(idLootChampion, enchant);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/unlockOrRefund/skin/{idLootSkin}")
    public ResponseEntity<NewItemDTO> unlockOrRefundSkinLoot(@PathVariable Long idLootSkin,
                                                                  @RequestParam (defaultValue = "true")boolean enchant)
    {
        NewItemDTO result = userLootService.unlockOrRefundSkinLoot(idLootSkin, enchant);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/unlockOrRefund/icon/{idLootIcon}")
    public ResponseEntity<NewItemDTO> unlockOrRefundIconLoot(@PathVariable Long idLootIcon,
                                                                  @RequestParam (defaultValue = "true") boolean enchant)
    {
        NewItemDTO result = userLootService.unlockOrRefundIconLoot(idLootIcon, enchant);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/reRoll/champions")
    public ResponseEntity<NewItemDTO> reRollChampionsLoot(@RequestParam Long idLootChampion1,
                                                           @RequestParam Long idLootChampion2,
                                                           @RequestParam Long idLootChampion3)
    {
        NewItemDTO result = userLootService.
                reRollChampionsLoot(idLootChampion1, idLootChampion2, idLootChampion3);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/reRoll/skins")
    public ResponseEntity<NewItemDTO> reRollSkinsLoot(@RequestParam Long idLootSkin1,
                                                           @RequestParam Long idLootSkin2,
                                                           @RequestParam Long idLootSkin3)
    {
        NewItemDTO result = userLootService.
                reRollSkinsLoot(idLootSkin1, idLootSkin2, idLootSkin3);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/reRoll/icons")
    public ResponseEntity<NewItemDTO> reRollIconsLoot(@RequestParam Long idLootIcon1,
                                                           @RequestParam Long idLootIcon2,
                                                           @RequestParam Long idLootIcon3)
    {
        NewItemDTO result = userLootService.
                reRollIconsLoot(idLootIcon1, idLootIcon2, idLootIcon3);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/disenchantAll")
    public ResponseEntity<UserLootDTO> disenchantAll(@RequestParam Long idUser,
                                                     @RequestParam @Parameter(schema = @Schema(allowableValues = {"SKINS", "CHAMPIONS", "ICONS"}))
                                                     String lootType,
                                                     @RequestParam(defaultValue = "true") boolean showInactives)
    {
        return ResponseEntity.ok(userLootService.disenchantAll(idUser,lootType,showInactives));
    }

    @PutMapping("/disenchantOwnedItems")
    public ResponseEntity<UserLootDTO> disenchantOwnedItems(
            @RequestParam Long idUser,
            @RequestParam(defaultValue = "true") boolean showInactives) {

        UserLootDTO result = userLootService.disenchantOwnedItems(idUser, showInactives);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/enchantAll")
    public ResponseEntity<UserLootDTO> enchantAll(@RequestParam Long idUser,
                                                  @RequestParam
                                                  @Parameter(schema = @Schema(allowableValues = {"SKINS", "CHAMPIONS", "ICONS"}))
                                                  String lootType,
                                                  @RequestParam(defaultValue = "true") boolean showInactives) {
        return ResponseEntity.ok(userLootService.enchantAll(idUser, lootType, showInactives));
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<UserLootDTO> findById (@PathVariable Long id,
                                                 @RequestParam(defaultValue = "true") boolean showInactives)
    {
        return ResponseEntity.ok(userLootService.findById(id,showInactives));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserLoot(@PathVariable("id") Long id) {
        userLootService.delete(id);
        return ResponseEntity.ok("User loot with ID " + id + " was successfully deleted.");
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<UserLootDTO>> getAll (@RequestParam(defaultValue = "true")
                                                   boolean showInactives)
    {
        return ResponseEntity.ok(userLootService.findAll(showInactives));
    }
    @DeleteMapping("/delete/lootInventory/{idLoot}")
    public ResponseEntity<Void> deleteLootInventory(@PathVariable Long idLoot,
                                                    @RequestParam
                                                    @Parameter(schema = @Schema(allowableValues = {"CHAMPION", "SKIN", "ICON"}))
                                                    String typeLoot)
    {
        userLootService.deleteLootInventory(idLoot, typeLoot);
        return ResponseEntity.noContent().build();
    }



}
