package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.userStats.UserGeneralStatsDTO;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("usersMatches")
@CrossOrigin(origins = {"http://localhost:3000", "https://lol-client-front.onrender.com"})
public class UserMatchesController {
    @Autowired
    UserMatchesService userMatchesService;


    @GetMapping("/{userId}/stats")
    public ResponseEntity<UserGeneralStatsDTO> getGeneralStats(
            @PathVariable Long userId,
            @Parameter(
                    schema = @Schema(allowableValues = {"NORMAL", "RANKED", "ARAM"})
            )
            @RequestParam(required = false) String gameType) {
        UserGeneralStatsDTO stats = userMatchesService.getGeneralStats(userId, gameType);
        return ResponseEntity.ok(stats);
    }


    @GetMapping("/{userId}/stats/champion/{championId}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByChampion(
            @PathVariable Long userId,
            @PathVariable Long championId,
            @Parameter(
                    schema = @Schema(allowableValues = {"NORMAL", "RANKED", "ARAM"})
            )
            @RequestParam(required = false) String gameType) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByChampion(userId, championId, gameType);
        return ResponseEntity.ok(stats);
    }


    @GetMapping("/{userId}/stats/role/{roleName}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByRole(
            @PathVariable Long userId,
            @PathVariable String roleName,
            @Parameter(
                    schema = @Schema(allowableValues = {"NORMAL", "RANKED"})
            )
            @RequestParam(required = false) String gameType) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByRole(userId, roleName, gameType);
        return ResponseEntity.ok(stats);
    }


    @GetMapping("/{userId}/stats/champion/{championId}/role/{roleName}")
    public ResponseEntity<UserGeneralStatsDTO> getStatsByChampionAndRole(
            @PathVariable Long userId,
            @PathVariable Long championId,
            @PathVariable String roleName,
            @Parameter(
                    schema = @Schema(allowableValues = {"NORMAL", "RANKED"})
            )
            @RequestParam(required = false) String gameType) {
        UserGeneralStatsDTO stats = userMatchesService.getStatsByChampionAndRole(userId, championId, roleName, gameType);
        return ResponseEntity.ok(stats);
    }

}
