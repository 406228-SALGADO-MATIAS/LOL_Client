package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.services.interfaces.domain.MatchService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("matches")
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
