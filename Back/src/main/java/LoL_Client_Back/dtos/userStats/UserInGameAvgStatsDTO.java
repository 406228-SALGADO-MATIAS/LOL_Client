package LoL_Client_Back.dtos.userStats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInGameAvgStatsDTO {
    private double[] avgKda = new double[3];
    private double avgFarm;
    private double avgTotalGoldEarned;
    private double avgGoldEarned;
    private double avgDamageDealt;
    private String avgDurationGame;
}