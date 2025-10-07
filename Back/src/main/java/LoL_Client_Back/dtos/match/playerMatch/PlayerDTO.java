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
    private String roleImg = "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/mid.png";
    private List<PlayerMatchItemDTO> items;
    private int kills;
    private int deaths;
    private int assists;
    private int totalGold;
    private int totalFarm;
    private int totalDamage;


}
