package LoL_Client_Back.dtos.userStats;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.services.implementations.domain.matchLogic.DamageEstimatorService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInGameTotalStatsDTO {
    private int[] kdaSum = new int[3];
    private int totalFarm;
    private int totalGoldEarned;
    private int totalDamageDealt;
    private String totalTimePlayed;

    public static UserInGameTotalStatsDTO createFromDetails(List<PlayerMatchDetailEntity> details) {
        UserInGameTotalStatsDTO dto = new UserInGameTotalStatsDTO();
        DamageEstimatorService damageEstimatorService = new DamageEstimatorService();

        dto.kdaSum[0] = details.stream().mapToInt(PlayerMatchDetailEntity::getKills).sum();
        dto.kdaSum[1] = details.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).sum();
        dto.kdaSum[2] = details.stream().mapToInt(PlayerMatchDetailEntity::getAssists).sum();

        dto.totalFarm = details.stream().mapToInt(PlayerMatchDetailEntity::getCreaturesKilled).sum();
        dto.totalGoldEarned = details.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).sum();
        dto.totalDamageDealt = details.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).sum();

        int totalSeconds = details.stream()
                .map(PlayerMatchDetailEntity::getMatch)
                .map(MatchEntity::getDuration)
                .filter(Objects::nonNull)
                .mapToInt(damageEstimatorService::parseDurationToSeconds)
                .sum();

        dto.totalTimePlayed = formatSecondsToDuration(totalSeconds);

        return dto;
    }

    protected static String formatSecondsToDuration(int totalSeconds) {
        int h = totalSeconds / 3600;
        int m = (totalSeconds % 3600) / 60;
        int s = totalSeconds % 60;
        return h > 0 ? String.format("%02d:%02d:%02d", h, m, s)
                : String.format("%02d:%02d", m, s);
    }

}
