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

    public static UserInGameTotalStatsDTO createFromDetails(List<PlayerMatchDetailEntity> details) {
        UserInGameTotalStatsDTO dto = new UserInGameTotalStatsDTO();

        dto.getKdaSum()[0] = details.stream().mapToInt(PlayerMatchDetailEntity::getKills).sum();
        dto.getKdaSum()[1] = details.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).sum();
        dto.getKdaSum()[2] = details.stream().mapToInt(PlayerMatchDetailEntity::getAssists).sum();
        dto.setMaxKills(details.stream().mapToInt(PlayerMatchDetailEntity::getKills).max().orElse(0));
        dto.setMaxDeaths(details.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).max().orElse(0));
        dto.setMaxAssists(details.stream().mapToInt(PlayerMatchDetailEntity::getAssists).max().orElse(0));
        dto.setTotalGoldEarned(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).sum());
        dto.setMaxGoldEarned(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).max().orElse(0));
        dto.setTotalDamageDealt(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).sum());
        dto.setMaxDamageDealt(details.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).max().orElse(0));
        dto.setTotalFarm(details.stream().mapToInt(PlayerMatchDetailEntity::getCreaturesKilled).sum());

        DamageEstimatorService damageEstimatorService = new DamageEstimatorService();

        // max and total durations:

        int totalMinutes = details.stream()
                .map(PlayerMatchDetailEntity::getMatch)
                .map(MatchEntity::getDuration)
                .filter(Objects::nonNull)
                .mapToInt(damageEstimatorService::parseDurationToSeconds)
                .sum();
        dto.setTotalTimePlayed(formatMinutesToDurationWithSeconds(totalMinutes));

        int maxMinutes = details.stream()
                .map(PlayerMatchDetailEntity::getMatch)
                .map(MatchEntity::getDuration)
                .filter(Objects::nonNull)
                .mapToInt(damageEstimatorService::parseDurationToSeconds)
                .max()
                .orElse(0);
        dto.setLongestGame(formatMinutesToDurationWithSeconds(maxMinutes));

        return dto;
    }

    private static String formatMinutesToDurationWithSeconds(int totalSeconds) {
        int h = totalSeconds / 3600;
        int m = (totalSeconds % 3600) / 60;
        int s = totalSeconds % 60;
        return h > 0 ? String.format("%02d:%02d:%02d", h, m, s)
                : String.format("%02d:%02d", m, s);
    }

}
