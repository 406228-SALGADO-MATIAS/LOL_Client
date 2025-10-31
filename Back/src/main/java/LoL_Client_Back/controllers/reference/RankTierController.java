package LoL_Client_Back.controllers.reference;

import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.services.interfaces.reference.RankTierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ranks")
@CrossOrigin(origins = "http://localhost:3000")
public class RankTierController {

    @Autowired
    RankTierService rankTierService;

    @GetMapping("/all")
    public ResponseEntity<List<RankTierEntity>> getAll()
    {
        return ResponseEntity.ok(rankTierService.getAll());
    }
}
