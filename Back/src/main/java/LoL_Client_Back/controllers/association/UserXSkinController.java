package LoL_Client_Back.controllers.association;

import LoL_Client_Back.dtos.association.UserXSkinDTO;
import LoL_Client_Back.services.interfaces.assocation.UserXSkinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("UserXSkin")
public class UserXSkinController {
    @Autowired
    UserXSkinService service;

    @GetMapping("{id}")
    ResponseEntity<UserXSkinDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/getAll")
    ResponseEntity<List<UserXSkinDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/findBySkinId/{id}")
    ResponseEntity<List<UserXSkinDTO>> findBySkinId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findBySkinId(id));
    }

    @GetMapping("/findByUserId/{id}")
    ResponseEntity<List<UserXSkinDTO>> findByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findByUserId(id));
    }

    @GetMapping("/findByUserAndSkinId")
    ResponseEntity<UserXSkinDTO> findByUserAndSkinId(@RequestParam Long userId,
                                                     @RequestParam Long skinId) {
        return ResponseEntity.ok(service.findByUserAndSkin(skinId, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }

    @PostMapping("/create")
    public ResponseEntity<UserXSkinDTO> createSkinBelonging(@RequestParam Long idUser,
                                                            @RequestParam Long idSkin) {
        UserXSkinDTO dto = service.createSkinBelonging(idUser, idSkin);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<UserXSkinDTO> updateSkinBelonging(
            @RequestParam Long idBelonging,
            @RequestParam Long idUser,
            @RequestParam Long idSkin
    ) {
        UserXSkinDTO dto = service.updateSkinBelongiong(idBelonging, idUser, idSkin);
        return ResponseEntity.ok(dto);
    }
    @PostMapping("/giveSkins/ToUsersWithout")
    public ResponseEntity<String> giveSkinsToUsersWithout() {
        String result = service.giveSkinsToUsersWithout();
        return ResponseEntity.ok(result);
    }
}
