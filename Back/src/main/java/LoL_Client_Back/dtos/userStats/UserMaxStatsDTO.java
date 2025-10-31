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
public class UserMaxStatsDTO {
    private int[] kdaMax = new int[3];
    private int maxFarm;
    private int maxGoldEarned;
    private int maxDamageDealt;
    private String longestGame;

    public static UserMaxStatsDTO createFromDetails(List<PlayerMatchDetailEntity> details) {
        UserMaxStatsDTO dto = new UserMaxStatsDTO();
        DamageEstimatorService damageEstimatorService = new DamageEstimatorService();

        dto.kdaMax[0] = details.stream().mapToInt(PlayerMatchDetailEntity::getKills).max().orElse(0);
        dto.kdaMax[1] = details.stream().mapToInt(PlayerMatchDetailEntity::getDeaths).max().orElse(0);
        dto.kdaMax[2] = details.stream().mapToInt(PlayerMatchDetailEntity::getAssists).max().orElse(0);

        dto.maxGoldEarned = details.stream().mapToInt(PlayerMatchDetailEntity::getTotalGold).max().orElse(0);
        dto.maxDamageDealt = details.stream().mapToInt(PlayerMatchDetailEntity::getTotalDamage).max().orElse(0);
        dto.maxFarm = details.stream().mapToInt(PlayerMatchDetailEntity::getCreaturesKilled).max().orElse(0);

        int maxSeconds = details.stream()
                .map(PlayerMatchDetailEntity::getMatch)
                .map(MatchEntity::getDuration)
                .filter(Objects::nonNull)
                .mapToInt(damageEstimatorService::parseDurationToSeconds)
                .max()
                .orElse(0);

        dto.longestGame = UserInGameTotalStatsDTO.formatSecondsToDuration(maxSeconds);

        return dto;
    }
}