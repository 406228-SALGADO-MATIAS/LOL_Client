package LoL_Client_Back.controllers.association;

import LoL_Client_Back.dtos.association.UserXChampionDTO;
import LoL_Client_Back.models.association.UserXChampion;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("UserXChampion")
public class UserXChampionController {
    @Autowired
    UserXChampionService service;

    @GetMapping("{id}")
    ResponseEntity<UserXChampionDTO> getById(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.findById(id));
    }
    @GetMapping("/getAll")
    ResponseEntity<List<UserXChampionDTO>> getAll()
    {
        return ResponseEntity.ok(service.getAll());
    }
    @GetMapping("/findByChampionId/{id}")
    ResponseEntity<List<UserXChampionDTO>> findByChampionId(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.findByChampionId(id));
    }
    @GetMapping("/findByUserId/{id}")
    ResponseEntity<List<UserXChampionDTO>> findByUserId(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.findByUserId(id));
    }
    @GetMapping("/findByUserAndChampionId")
    ResponseEntity<UserXChampionDTO>findByUserAndChampionId(@RequestParam Long userId,
                                                            @RequestParam Long championId)
    {
        return ResponseEntity.ok(service.findByUserAndChampion(championId,userId));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }
    @PostMapping("/create")
    public ResponseEntity<UserXChampionDTO> createChampionBelonging(@RequestParam Long idUser,
                                                                    @RequestParam Long idChampion)
    {
        UserXChampionDTO dto = service.createChampionBelonging(idUser, idChampion);
        return ResponseEntity.ok(dto);
    }
    @PutMapping("/update")
    public ResponseEntity<UserXChampionDTO> updateChampionBelonging(
            @RequestParam Long idBelonging,
            @RequestParam Long idUser,
            @RequestParam Long idChampion,
            @RequestParam(required = false) Integer masteryLevel
    ) {
        UserXChampionDTO dto = service.updateChampionBelongiong(idBelonging, idUser, idChampion, masteryLevel);
        return ResponseEntity.ok(dto);
    }
}
