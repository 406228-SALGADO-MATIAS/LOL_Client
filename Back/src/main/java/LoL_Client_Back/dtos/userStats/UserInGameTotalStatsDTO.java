package LoL_Client_Back.dtos.userStats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInGameTotalStatsDTO {
    private int[] kdaSum = new int[3];
    private int maxKills;
    private int maxDeaths;
    private int maxAssists;
    private int totalFarm;
    private int totalGoldEarned;
    private int maxGoldEarned;
    private int maxDamageDealt;
    private int totalDamageDealt;
    private String longestGame;
    private String totalTimePlayed;

}
