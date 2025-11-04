package LoL_Client_Back.controllers.reference;

import LoL_Client_Back.dtos.reference.ProfileIconDTO;
import LoL_Client_Back.services.interfaces.reference.ProfileIconService;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ProfileIcon")
@CrossOrigin(origins = {"http://localhost:3000", "https://lol-client-front.onrender.com"})
public class ProfileIconController {
    @Autowired
    ProfileIconService profileIconService;
    @GetMapping("/{id}")
    public ResponseEntity<ProfileIconDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(profileIconService.getById(id));
    }

    @GetMapping("getAll")
    public ResponseEntity<List<ProfileIconDTO>> getAll() {
        return ResponseEntity.ok(profileIconService.getAll());
    }

    @GetMapping("/byName")
    public ResponseEntity<List<ProfileIconDTO>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(profileIconService.findByName(name));
    }

    @GetMapping("/getUserIcons/{idUser}")
    public ResponseEntity<List<ProfileIconDTO>> getUserIcons(@PathVariable Long idUser) {
        return ResponseEntity.ok(profileIconService.getUserIcons(idUser));
    }

    @GetMapping("/getUserIcons/NotInPossession/{idUser}")
    public ResponseEntity<List<ProfileIconDTO>> getUserIconsNotPossess(@PathVariable Long idUser) {
        return ResponseEntity.ok(profileIconService.getUserIconsNotPossess(idUser));
    }

    @PostMapping
    public ResponseEntity<ProfileIconDTO> createProfileIcon(
            @RequestParam String iconName,
            @RequestParam String imageUrl,
            @RequestParam
            @Schema(allowableValues = {"450", "1350", "3150", "4800", "6300", "7800"})
            Integer blueEssencePrice
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(profileIconService.createProfileIcon(iconName, imageUrl, blueEssencePrice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileIconDTO> updateProfileIcon(
            @PathVariable Long id,
            @RequestParam(required = false) String iconName,
            @RequestParam(required = false) String imageUrl,
            @RequestParam
            @Schema(allowableValues = {"450", "1350", "3150", "4800", "6300", "7800"})
            Integer blueEssencePrice
    ) {
        return ResponseEntity.ok(
                profileIconService.updateProfileIcon(id, iconName, imageUrl, blueEssencePrice)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfileIcon(@PathVariable Long id) {
        profileIconService.deleteProfileIcon(id);
        return ResponseEntity.noContent().build();
    }

}
