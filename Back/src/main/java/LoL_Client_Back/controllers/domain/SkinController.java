package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.skin.SkinDTO;
import LoL_Client_Back.dtos.enums.Champion;
import LoL_Client_Back.services.interfaces.domain.SkinService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("skins")
@CrossOrigin(origins = "http://localhost:3000")
public class SkinController {
    @Autowired
    SkinService skinService;

    @GetMapping("/getAll")
    ResponseEntity<List<SkinDTO>> getAllSkins()
    {
        return ResponseEntity.ok(skinService.getAllSkins());
    }
    @GetMapping("/getSkins/byChampion")
    ResponseEntity<List<SkinDTO>> getSkinsByChampionName(@RequestParam Champion champion)
    {
        return ResponseEntity.ok(skinService.findSkinsByChampionName(champion));
    }
    @GetMapping("/getSkins/byPrice/{rpCost}")
    ResponseEntity<List<SkinDTO>> findSkinsByRpCost
            (@Parameter(schema = @Schema(allowableValues = {"GREATER", "LESSER"}))
             @RequestParam String filter,
             @PathVariable Integer rpCost)
    {
        return ResponseEntity.ok(skinService.findSkinsByRpCost(filter,rpCost));
    }
    @GetMapping("/getSkins/byName/{name}")
    ResponseEntity<List<SkinDTO>> findSkinsByName(@PathVariable String name)
    {
        return ResponseEntity.ok(skinService.findSkinsByName(name));
    }
    @GetMapping("/getSkin/{id}")
    ResponseEntity<SkinDTO> getSkinById(@PathVariable Long id)
    {
        return ResponseEntity.ok(skinService.getSkinById(id));
    }
    @GetMapping("/getSkins/byChampionId/{id}")
    ResponseEntity<List<SkinDTO>> getSkinsByChampionId(@PathVariable Long id)
    {
        return ResponseEntity.ok(skinService.findSkinsByChampionId(id));
    }
    @GetMapping("/getUserSkins/{idUser}")
    ResponseEntity<List<SkinDTO>> getUserSkins(@PathVariable Long idUser)
    {
        return ResponseEntity.ok(skinService.getUserSkins(idUser));
    }
    @GetMapping("/getUserSkins/NotPossess/{idUser}")
    ResponseEntity<List<SkinDTO>> getUserSkinsNotPossess(@PathVariable Long idUser)
    {
        return ResponseEntity.ok(skinService.getUserSkinsNotPossess(idUser));
    }
    @GetMapping("/getUserSkins/toPurchase/{idUser}")
    public ResponseEntity<List<SkinDTO>> getUserSkinsToPurchase(@PathVariable Long idUser) {
        return ResponseEntity.ok(skinService.getUserSkinsEnabledPurchase(idUser));
    }

    @PostMapping("/createSkin")
    ResponseEntity<SkinDTO> createSkin(@RequestParam Long championId, @RequestParam String name,
                                       @RequestParam String imageUrl,
                                       @Parameter (schema =
                                       @Schema(allowableValues = {"520","750","975","1350","1820"}))
                                       @RequestParam Integer rpCost)
    {
        return ResponseEntity.ok(skinService.createSkin(name,championId,imageUrl,rpCost));
    }
    @PutMapping("/updateSkin/{skinId}")
    ResponseEntity<SkinDTO> updateSkin(@PathVariable Long skinId,
                                       @RequestParam Long championId,
                                       @RequestParam String name,
                                       @RequestParam String imageUrl,
                                       @Parameter (schema =
                                       @Schema(allowableValues = {"520","750","975","1350","1820"}))
                                       @RequestParam Integer rpCost)
    {
        return ResponseEntity.ok(skinService.updateSkin(skinId,name,championId,imageUrl,rpCost));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSkin(@PathVariable Long id) {
        skinService.deleteSkin(id);
        return ResponseEntity.noContent().build(); // 204
    }

}
