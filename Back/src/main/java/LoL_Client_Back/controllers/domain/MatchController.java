package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.services.interfaces.domain.MatchService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("matches")
public class MatchController
{
    @Autowired
    MatchService matchService;

    @PostMapping("/createMatch")
    public ResponseEntity<MatchDTO> createMatch(@RequestParam ServerOption server,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"RANKED", "NORMAL"})) String gameMode,
                                                @RequestParam @Parameter(schema = @Schema(allowableValues = {"ARAM", "SUMMONERS RIFT"})) String map,
                                                @RequestParam UserRankTier elo,
                                                @RequestParam boolean showChampionImg,
                                                @RequestParam boolean showItemImg)
    {
        return ResponseEntity.ok(matchService.createMatch(server, gameMode, map, elo, showChampionImg, showItemImg));
    }

}
