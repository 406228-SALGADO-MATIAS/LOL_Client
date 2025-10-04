package LoL_Client_Back.controllers.association;

import LoL_Client_Back.dtos.UpdateStatementDTO;
import LoL_Client_Back.dtos.association.UserXChampionDTO;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("UserXChampion")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping(value = "/generateIconUpdates", produces = "text/plain")
    public ResponseEntity<String> generateIconUpdates() {
        try {
            List<UpdateStatementDTO> updates = service.updateUserProfiles(); // llamamos al servicio
            StringBuilder sb = new StringBuilder();

            for (UpdateStatementDTO dto : updates) {
                // NO hacemos replace aquí, ya viene correcto
                sb.append(dto.getStatement()).append(";\n"); // agregamos ; para cada UPDATE
            }

            return ResponseEntity.ok(sb.toString());
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
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
    @PostMapping("/giveChampions/toUsersWithout")
    public ResponseEntity<String> giveChampionsToUsersWithout() {
        String result = service.giveChampionsToUsersWithNoChampions();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/unlockChampion")
    public ResponseEntity<UserXChampionDTO> unlockChampion(@RequestParam Long idUser,
                                                                    @RequestParam Long idChampion)
    {
        UserXChampionDTO dto = service.unlockChampion(idUser, idChampion);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/unlockAllChampions/{idUser}")
    public ResponseEntity<UserXChampionDTO> unlockAllChampions(@PathVariable Long idUser)
    {
        service.unlockAllChampions(idUser);
        return ResponseEntity.noContent().build(); // 204
    }
}
