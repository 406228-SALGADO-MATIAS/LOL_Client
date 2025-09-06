package LoL_Client_Back.dtos.userStats;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.services.implementations.domain.matchLogic.DamageEstimatorService;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInGameAvgStatsDTO {
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private double[] avgKda = new double[3];
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private double avgFarm;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private double avgGoldEarned;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private double avgDamageDealt;
    private String avgDurationGame;

    public static UserInGameAvgStatsDTO createFromDetails(List<PlayerMatchDetailEntity> details) {
        UserInGameAvgStatsDTO dto = new UserInGameAvgStatsDTO();

        dto.getAvgKda()[0] = roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getKills).average().orElse(0));
        dto.getAvgKda()[1] = roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).average().orElse(0));
        dto.getAvgKda()[2] = roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getAssists).average().orElse(0));
        dto.setAvgGoldEarned(roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).average().orElse(0)));
        dto.setAvgDamageDealt(roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).average().orElse(0)));
        dto.setAvgFarm(roundTwoDecimals(details.stream().mapToInt(PlayerMatchDetailEntity::getCreaturesKilled).average().orElse(0)));

        DamageEstimatorService damageEstimatorService = new DamageEstimatorService();

        // avg duration
        int totalMinutes = details.stream()
                .map(PlayerMatchDetailEntity::getMatch)
                .map(MatchEntity::getDuration)
                .filter(Objects::nonNull)
                .mapToInt(damageEstimatorService::parseDurationToSeconds)
                .sum();
        int avgMinutes = details.isEmpty() ? 0 : totalMinutes / details.size();
        dto.setAvgDurationGame(formatMinutesToDurationWithSeconds(avgMinutes));

        return dto;

    }

    private static String formatMinutesToDurationWithSeconds(int totalSeconds) {
        int h = totalSeconds / 3600;
        int m = (totalSeconds % 3600) / 60;
        int s = totalSeconds % 60;
        return h > 0 ? String.format("%02d:%02d:%02d", h, m, s)
                : String.format("%02d:%02d", m, s);
    }

    private static double roundTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}