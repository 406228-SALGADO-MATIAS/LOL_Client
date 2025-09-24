package LoL_Client_Back.dtos.match;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.reference.PlayerMatchItemEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerMatchesHistoryDTO {
    private Long idMatch;
    private String matchType;
    private boolean mirrorChampions;
    private String map;
    private boolean win;
    private String duration;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;
    private String champion;
    @Lob
    private String squareChampion;
    private String role;
    private int kills;
    private int deaths;
    private int assists;
    private int totalGold;
    private int totalFarm;

    private List<PlayerMatchHistoryItemDTO> items;

    public static List<PlayerMatchesHistoryDTO> getUserHistory(List<PlayerMatchDetailEntity> details) {
        List<PlayerMatchesHistoryDTO> dtos = new ArrayList<>();

        for (PlayerMatchDetailEntity detail : details) {
            MatchEntity match = detail.getMatch();

            PlayerMatchesHistoryDTO dto = new PlayerMatchesHistoryDTO();
            dto.setIdMatch(match.getId());
            dto.setDuration(match.getDuration());
            dto.setDate(match.getDate());

            dto.setKills(detail.getKills() != null ? detail.getKills() : 0);
            dto.setDeaths(detail.getDeaths() != null ? detail.getDeaths() : 0);
            dto.setAssists(detail.getAssists() != null ? detail.getAssists() : 0);
            dto.setTotalGold(detail.getTotalGold() != null ? detail.getTotalGold() : 0);
            dto.setTotalFarm(detail.getCreaturesKilled() != null ? detail.getCreaturesKilled() : 0);

            if (!match.getRanked()) {
                dto.setMirrorChampions(true);
                if ("ARAM - Howling Abyss".equals(match.getMap().getMap())) {
                    dto.setMap("ARAM - Howling Abyss");
                    dto.setMatchType("Normal - Random Picks");
                } else {
                    dto.setMap("Summoners Rift");
                    dto.setMatchType("Normal - Classic 5v5");
                }
            } else {
                dto.setMirrorChampions(false);
                dto.setMap("Summoners Rift");
                dto.setMatchType("Ranked - Classic 5v5");
            }
            dto.setChampion(detail.getChampion().getName());
            dto.setSquareChampion(detail.getChampion().getImageSquare());
            if (detail.getRole() != null)
                dto.setRole(detail.getRole().getRole());
            dto.setWin(match.getWinnerTeam().equals(detail.getTeam()));

            // items
            List<PlayerMatchHistoryItemDTO> items = new ArrayList<>();
            for (PlayerMatchItemEntity item : detail.getItems()) {
                PlayerMatchHistoryItemDTO itemDTO = new PlayerMatchHistoryItemDTO();
                itemDTO.setId(item.getItem().getId());
                itemDTO.setItemName(item.getItem().getName());
                itemDTO.setImage(item.getItem().getImage());
                items.add(itemDTO);
            }
            dto.setItems(items);

            dtos.add(dto);
        }

        dtos.sort(Comparator.comparing(PlayerMatchesHistoryDTO::getDate).reversed());
        
        return dtos;
    }
}

