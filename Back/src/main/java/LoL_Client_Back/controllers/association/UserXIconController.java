package LoL_Client_Back.controllers.association;

import LoL_Client_Back.dtos.UpdateStatementDTO;
import LoL_Client_Back.dtos.association.UserXIconDTO;
import LoL_Client_Back.services.interfaces.assocation.UserXIconService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("UserXIcon")
@CrossOrigin(origins = {"http://localhost:3000", "https://lol-client-front.onrender.com"})
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

    @PostMapping("/give-icons-to-all")
    public ResponseEntity<String> giveIconsToAllUsers() {
        String result = service.giveIconsToAllUsers();
        return ResponseEntity.ok(result);
    }
    @PostMapping("/unlockIcon")
    public ResponseEntity<UserXIconDTO> unlockIcon(@RequestParam Long idUser,
                                                   @RequestParam Long idIcon) {
        UserXIconDTO dto = service.unlockIcon(idUser, idIcon);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/unlockAllIcons/{idUser}")
    public ResponseEntity<UserXIconDTO> unlockAllIcons(@PathVariable Long idUser) {
        service.unlockAllIcons(idUser);
        return ResponseEntity.noContent().build(); // 204
    }

    @GetMapping(value = "/generateIconUpdates", produces = "text/plain")
    public ResponseEntity<String> generateIconUpdates() {
        try {
            List<UpdateStatementDTO> updates = service.getUpdateUsers();
            StringBuilder sb = new StringBuilder();
            for (UpdateStatementDTO dto : updates) {
                sb.append(dto.getStatement()).append("\n");
            }
            return ResponseEntity.ok(sb.toString());
        } catch (ResponseStatusException ex) {
            // Devuelve el mensaje de error como texto plano
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
        }
    }

}
