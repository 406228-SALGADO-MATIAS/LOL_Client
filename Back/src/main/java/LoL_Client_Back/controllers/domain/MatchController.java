package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.dtos.match.playerHistory.PlayerHistoryDTO;
import LoL_Client_Back.dtos.match.playerHistory.PlayerMatchDTO;
import LoL_Client_Back.dtos.match.playerMatch.UserMatchDTO;
import LoL_Client_Back.services.interfaces.domain.MatchService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("matches")
@CrossOrigin(origins = {"http://localhost:3000", "https://lol-client-front.onrender.com"})
public class MatchController
{
    @Autowired
    MatchService matchService;

    @GetMapping("/{matchId}")
    public ResponseEntity<MatchDTO> findMatchById(
            @PathVariable Long matchId,
            @RequestParam(defaultValue = "false") boolean showChampionImg,
            @RequestParam(defaultValue = "false") boolean showItemImg) {

        MatchDTO matchDTO = matchService.getMatchById(matchId, showChampionImg, showItemImg);
        return ResponseEntity.ok(matchDTO);
    }

    @GetMapping
    public ResponseEntity<List<MatchDTO>> getAllMatches(
            @RequestParam(defaultValue = "false") boolean showChampionImg,
            @RequestParam(defaultValue = "false") boolean showItemImg) {

        List<MatchDTO> matches = matchService.getAllMatches(showChampionImg, showItemImg);
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MatchDTO>> findMatchesByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "false") boolean showChampionImg,
            @RequestParam(defaultValue = "false") boolean showItemImg) {

        List<MatchDTO> matches = matchService.findMatchesByUserId(userId, showChampionImg, showItemImg);
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/getUserHistory/{userId}")
    public ResponseEntity<PlayerHistoryDTO> getUserMatchesHistory(
            @PathVariable Long userId,
            @RequestParam(required = false)
            @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL", "ARAM"}))
            String gameType,
            @RequestParam(required = false)
            @Parameter(schema = @Schema(allowableValues = {"TOP", "JUNGLE", "MID", "ADC", "SUPPORT"}))
            String optionalRole,
            @RequestParam(required = false)
            @Parameter(schema = @Schema(allowableValues = {"Fighter", "Marksman", "Mage", "Assassin", "Tank", "Support"}))
            String optionalStyle
    ) {
        PlayerHistoryDTO history = matchService.getUserMatchesHistory(userId, gameType, optionalRole, optionalStyle);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/getUserMatch/{idMatch}/{idUser}")
    public ResponseEntity<UserMatchDTO> getUserMatch(@PathVariable Long idMatch, @PathVariable Long idUser)
    {
        return ResponseEntity.ok(matchService.getUserMatch(idUser,idMatch));
    }

    @PostMapping("/createMatch")
    public ResponseEntity<MatchDTO> createMatch(@RequestParam ServerOption server,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"})) String gameMode,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"ARAM", "SUMMONERS RIFT"})) String map,
                                                @RequestParam UserRankTier elo,
                                                @RequestParam (defaultValue = "false") boolean showChampionImg,
                                                @RequestParam (defaultValue = "false") boolean showItemImg)
    {
        return ResponseEntity.ok(matchService.createMatch(server, gameMode, map, elo, showChampionImg, showItemImg));
    }

    @PostMapping("/createMatch/{userId}")
    public ResponseEntity<MatchDTO> createMatchWithUser(@PathVariable Long userId,
                                                        @RequestParam (defaultValue = "RANKED")
                                                        @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"}))
                                                        String gameMode,
                                                        @RequestParam (defaultValue = "SUMMONERS RIFT")
                                                            @Parameter(schema = @Schema(allowableValues = {"ARAM", "SUMMONERS RIFT"}))
                                                            String map,
                                                        @RequestParam(defaultValue = "false") boolean showChampionImg,
                                                        @RequestParam(defaultValue = "false") boolean showItemImg)
    {
        MatchDTO match = matchService.createMatchForUser(userId, gameMode, map, showChampionImg, showItemImg);
        return ResponseEntity.ok(match);
    }

    @PostMapping("/createMatch/userAndRole/{userId}")
    public ResponseEntity<MatchDTO> createMatchForUserAndRole(@PathVariable Long userId,
                                                              @RequestParam @Parameter(schema = @Schema(allowableValues = {"TOP", "JUNGLE", "MID", "ADC", "SUPPORT"}))
                                                              String role,
                                                              @RequestParam @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"}))
                                                                  String gameMode,
                                                              @RequestParam(defaultValue = "false") boolean showChampion,
                                                              @RequestParam(defaultValue = "false") boolean showItem)
    {
        MatchDTO match = matchService.createMatchForUserAndRole(userId, role, gameMode, showChampion, showItem);
        return ResponseEntity.ok(match);
    }

    @PostMapping("/createMatch/userRoleAndChampion/{userId}")
    public ResponseEntity<MatchDTO> createMatchForUserRoleAndChampion(
            @PathVariable Long userId,
            @RequestParam @Parameter(schema = @Schema(allowableValues = {"TOP", "JUNGLE", "MID", "ADC", "SUPPORT"}))
            String role,
            @RequestParam Long championId, // NUEVO: id del campeón elegido
            @RequestParam @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"}))
            String gameMode,
            @RequestParam(defaultValue = "false") boolean showChampion,
            @RequestParam(defaultValue = "false") boolean showItem
    ) {
        MatchDTO match = matchService.createMatchForUserRoleAndChampion(userId, role, championId, gameMode, showChampion, showItem);
        return ResponseEntity.ok(match);
    }

    @PostMapping("/createMatch/ARAM/userAndChampion/{userId}")
    public ResponseEntity<MatchDTO> createMatchARAMForUserAndChampion(
            @PathVariable Long userId,
            @RequestParam Long championId,
            @RequestParam(defaultValue = "false") boolean showChampion,
            @RequestParam(defaultValue = "false") boolean showItem
    ) {
        MatchDTO match = matchService.createMatchARAMForUserAndChampion(userId, championId, showChampion, showItem);
        return ResponseEntity.ok(match);
    }



    @PutMapping("/{matchId}")
    public ResponseEntity<MatchDTO> updateMatch(@PathVariable Long matchId,
                                                @RequestParam ServerOption serverOption,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"ARAM", "SUMMONERS RIFT"}))
                                                    String map,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"}))
                                                    String gameMode,
                                                @RequestParam UserRankTier elo,
                                                @RequestParam(required = false) Long userId,
                                                @RequestParam(required = false)
                                                    @Parameter(schema = @Schema(allowableValues = {"TOP", "JUNGLE", "MID", "ADC", "SUPPORT"}))
                                                    String role,
                                                @RequestParam(defaultValue = "false") boolean showChampion,
                                                @RequestParam(defaultValue = "false") boolean showItem
    ) {
        MatchDTO updated = matchService.updateMatchById(
                matchId, serverOption, gameMode, map, elo, userId, role, showChampion, showItem
        );
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/byMatch/{id}")
    public ResponseEntity<String> deleteMatch(@PathVariable("id") Long id) {
        matchService.delete(id);
        return ResponseEntity.ok("Match with ID " + id + " has been successfully deleted.");
    }
    @PostMapping("/generate-ranked-games")
    public ResponseEntity<String> generateRankedGames() {
        String result = matchService.generateRankedGames();
        return ResponseEntity.ok(result);
    }



}
