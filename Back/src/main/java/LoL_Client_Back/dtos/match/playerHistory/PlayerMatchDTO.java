package LoL_Client_Back.dtos.match.playerHistory;

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
public class PlayerMatchDTO {
    private Long idMatch;
    private String matchType;
    private boolean mirrorChampions;
    private String map;
    private boolean win;
    private String duration;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime date;
    private String champion;
    @Lob
    private String squareChampion;
    private String role;
    private String style;
    private int kills;
    private int deaths;
    private int assists;
    private int totalGold;
    private int totalFarm;

    private List<PlayerMatchItemDTO> items;

}

