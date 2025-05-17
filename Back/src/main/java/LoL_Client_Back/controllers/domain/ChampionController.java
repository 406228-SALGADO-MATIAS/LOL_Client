package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.champion.ChampionDTO;
import LoL_Client_Back.dtos.enums.ChampionDifficulty;
import LoL_Client_Back.dtos.enums.ChampionRole;
import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.models.domain.Champion;
import LoL_Client_Back.services.interfaces.domain.ChampionService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("champions")
public class ChampionController {
    @Autowired
    ChampionService championService;

    @PostMapping("/createChampion")
    public ResponseEntity<Champion> createChampion(
            @RequestParam String name,
            @RequestParam(required = false) Double winrate,
            @RequestParam(required = false) String imageUrl,
            @Parameter(
                    schema = @Schema(allowableValues = {"450", "1350", "3150", "4800", "6300", "7800"})
            )
            @RequestParam Integer price,
            @RequestParam ChampionDifficulty difficulty,
            @RequestParam(required = false) ChampionRole role,
            @RequestParam(required = false) ChampionRole role2,
            @RequestParam(required = false) ChampionStyle style,
            @RequestParam(required = false) ChampionStyle style2
    ) {
        Champion champion = championService.createChampion
                (name, winrate, imageUrl, price, difficulty, role, role2, style, style2);
        return ResponseEntity.status(HttpStatus.CREATED).body(champion);
    }

    @GetMapping("{id}")
    public ResponseEntity<ChampionDTO> getChampionById(@PathVariable Long id) {
        ChampionDTO dto = championService.getById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ChampionDTO>> getAllChampions()
    {
        return ResponseEntity.ok(championService.getAllChampions());
    }

    @GetMapping("/findChampions/{name}")
    public ResponseEntity<List<ChampionDTO>> findChampionsByName(@PathVariable String name)
    {
        return ResponseEntity.ok(championService.findChampionsByName(name));
    }

    @GetMapping("/findChampions/difficulty")
    public ResponseEntity<List<ChampionDTO>> findChampionsByDifficulty
            (@RequestParam ChampionDifficulty difficulty)
    {
        return ResponseEntity.ok(championService.findChampionsByDifficulty(difficulty));
    }

    @GetMapping("/findChampions/role(1)")
    public ResponseEntity<List<ChampionDTO>> findByMainRole
            (@RequestParam ChampionRole role)
    {
        return ResponseEntity.ok(championService.findByMainRole(role));
    }

    @GetMapping("/findChampions/style(1)")
    public ResponseEntity<List<ChampionDTO>> findByMainStyle
            (@RequestParam ChampionStyle style)
    {
        return ResponseEntity.ok(championService.findByMainStyle(style));
    }

    @GetMapping("/findChampions/role(1or2)")
    public ResponseEntity<List<ChampionDTO>> findChampionsByAnyRol
            (@RequestParam ChampionRole role)
    {
        return ResponseEntity.ok(championService.findChampionsByRole(role));
    }

    @GetMapping("/findChampions/style(1or2)")
    public ResponseEntity<List<ChampionDTO>> findByAnyStyle
            (@RequestParam ChampionStyle style)
    {
        return ResponseEntity.ok(championService.findByStyle(style));
    }

    @GetMapping("/findChampions/role(1or2)/style(1or2)")
    public ResponseEntity<List<ChampionDTO>> findChampionsByRolAndStyle
            (@RequestParam ChampionRole role, @RequestParam ChampionStyle style)
    {
        return ResponseEntity.ok(championService.findByRoleOrRole2AndStyleOrStyle2(role,style));
    }

    @GetMapping("/findChampions/role(1)/style(1or2)")
    public ResponseEntity<List<ChampionDTO>> findChampionsByMainRolAndStyle
            (@RequestParam ChampionRole role, @RequestParam ChampionStyle style)
    {
        return ResponseEntity.ok(championService.findByRoleAndStyleOrStyle2(role,style));
    }

    @GetMapping("/findChampions/release-date")
    public ResponseEntity<List<ChampionDTO>> findChampionsByReleaseDate(
            @Parameter(name = "fromDate",
            example = "2021-01-01")
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,
            @Parameter(
                    description = "Date filter",
                    schema = @Schema(allowableValues = {"AFTER", "BEFORE"})
            )
            @RequestParam
            String filter) {
        return ResponseEntity.ok(championService.findByDate(fromDate, filter));
    }

    @GetMapping("/findChampions/winrate")
    public ResponseEntity<List<ChampionDTO>> findChampionsByWinrate(
            @RequestParam Double winrate,
            @Parameter(
                    description = "Winrate filter",
                    schema = @Schema(allowableValues = {"GREATER", "LESSER"})
            )
            @RequestParam String filter) {
        return ResponseEntity.ok(championService.findByWinrate(winrate, filter));
    }

    @GetMapping("/findChampions/blue-essence")
    public ResponseEntity<List<ChampionDTO>> findChampionsByBlueEssenceCost(
            @RequestParam (defaultValue = "0", required = false) Integer cost,
            @Parameter(
                    description = "Price Filter",
                    schema = @Schema(allowableValues = {"HIGHER", "LESSER"})
            )
            @RequestParam String filter) {
        return ResponseEntity.ok(championService.findByBlueEssenceCost(cost, filter));
    }

    @PutMapping("/editChampion/{id}")
    public ResponseEntity<ChampionDTO> editChampion(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double winrate,
            @RequestParam(required = false)
            @Parameter(
                    schema = @Schema(allowableValues = {"450", "1350", "3150", "4800", "6300", "7800"})
            )
            Integer price,
            @RequestParam(required = false) ChampionDifficulty difficulty,
            @RequestParam(required = false) ChampionRole role,
            @RequestParam(required = false) ChampionRole role2,
            @RequestParam(required = false) ChampionStyle style,
            @RequestParam(required = false) ChampionStyle style2
    ) {
        return ResponseEntity.ok(
                championService.putChampion(id, name, winrate, price, difficulty, role, role2,style,style2)
        );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteChampion(@PathVariable Long id) {
        String message = championService.deleteChampion(id);
        return ResponseEntity.ok(message);
    }


}
