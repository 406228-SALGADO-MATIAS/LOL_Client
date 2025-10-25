package LoL_Client_Back.dtos.match.playerMatch;

import LoL_Client_Back.dtos.match.playerHistory.PlayerMatchItemDTO;
import jakarta.persistence.Lob;
import lombok.Data;

import java.util.List;

@Data
public class PlayerDTO {
    private Long userId;
    private String champion;
    @Lob
    private String squareChampion;
    private String nickName;
    private String role = "Aram - No role";
    @Lob
    private String roleImg = "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339125/mid_b7phfo.png";
    private List<PlayerMatchItemDTO> items;
    private int kills;
    private int deaths;
    private int assists;
    private int totalGold;
    private int totalFarm;
    private int totalDamage;


}
