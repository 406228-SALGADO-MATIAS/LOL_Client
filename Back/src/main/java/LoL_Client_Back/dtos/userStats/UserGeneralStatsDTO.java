package LoL_Client_Back.dtos.userStats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserGeneralStatsDTO {
    private String nickName;
    private Integer normalGames;
    private Integer normalWins;
    private Double normalWinRate;
    private Integer aramGames;
    private Integer aramWins;
    private Double aramWinRate;
    private Integer rankedGames;
    private Integer rankedWins;
    private Double rankedWinRate;
    private UserInGameTotalStatsDTO generalsStats;
    private UserInGameAvgStatsDTO averageStats;
    private List<ChampionsUsedDTO> championsUsed;
}
