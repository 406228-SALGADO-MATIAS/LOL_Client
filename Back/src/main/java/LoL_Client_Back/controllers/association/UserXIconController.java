package LoL_Client_Back.controllers.association;

import LoL_Client_Back.dtos.association.UserXIconDTO;
import LoL_Client_Back.services.interfaces.assocation.UserXIconService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("UserXIcon")
public class UserXIconController {
    @Autowired
    private UserXIconService service;

    @GetMapping("{id}")
    public ResponseEntity<UserXIconDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserXIconDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/findByIconId/{id}")
    public ResponseEntity<List<UserXIconDTO>> findByIconId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findByIconId(id));
    }

    @GetMapping("/findByUserId/{id}")
    public ResponseEntity<List<UserXIconDTO>> findByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findByUserId(id));
    }

    @GetMapping("/findByUserAndIconId")
    public ResponseEntity<UserXIconDTO> findByUserAndIconId(@RequestParam Long userId,
                                                            @RequestParam Long iconId) {
        return ResponseEntity.ok(service.findByUserAndIcon(iconId, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }

    @PostMapping("/create")
    public ResponseEntity<UserXIconDTO> createIconBelonging(@RequestParam Long idUser,
                                                            @RequestParam Long idIcon) {
        UserXIconDTO dto = service.createIconBelonging(idUser, idIcon);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<UserXIconDTO> updateIconBelonging(@RequestParam Long idBelonging,
                                                            @RequestParam Long idUser,
                                                            @RequestParam Long idIcon) {
        UserXIconDTO dto = service.updateIconBelonging(idBelonging, idUser, idIcon);
        return ResponseEntity.ok(dto);
    }
}
