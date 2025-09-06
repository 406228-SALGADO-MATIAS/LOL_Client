package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.userStats.UserGeneralStatsDTO;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("usersMatches")
@CrossOrigin(origins = "http://localhost:3000")
public class UserMatchesController {
    @Autowired
    UserMatchesService userMatchesService;

    @GetMapping("/{userId}/stats")
    public ResponseEntity<UserGeneralStatsDTO> getGeneralStats(@PathVariable Long userId) {
        UserGeneralStatsDTO stats = userMatchesService.getGeneralStats(userId);
        return ResponseEntity.ok(stats);
    }

    // 2. Stats por campeón
    @GetMapping("/{userId}/stats/champion/{championId}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByChampion(
            @PathVariable Long userId,
            @PathVariable Long championId) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByChampion(userId, championId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{userId}/stats/role/{roleName}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByRole(
            @PathVariable Long userId,
            @PathVariable String roleName) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByRole(userId, roleName);
        return ResponseEntity.ok(stats);
    }

    // 4. Stats por campeón + rol (usando String)
    @GetMapping("/{userId}/stats/champion/{championId}/role/{roleName}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByChampionAndRole(
            @PathVariable Long userId,
            @PathVariable Long championId,
            @PathVariable String roleName) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByChampionAndRole(userId, championId, roleName);
        return ResponseEntity.ok(stats);
    }

}
