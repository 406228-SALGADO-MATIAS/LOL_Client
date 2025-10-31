package LoL_Client_Back.dtos.match.playerMatch;

import lombok.Data;

import java.util.List;

@Data
public class TeamDTO {

    private int kills;
    private int deaths;
    private int assists;
    private int totalGold;
    private int totalFarm;
    private int totalDamage;

    private List<PlayerDTO> members;
}
