package LoL_Client_Back.dtos.userStats;

import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserGeneralStatsDTO {
    private Integer normalGames = 0;
    private Integer normalWins = 0;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private Double normalWinRate = 0.0;
    private Integer aramGames = 0;
    private Integer aramWins = 0;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private Double aramWinRate = 0.0;
    private Integer rankedGames = 0;
    private Integer rankedWins = 0;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "0.00")
    private Double rankedWinRate = 0.0;

    private UserInGameTotalStatsDTO totalStats;
    private UserMaxStatsDTO maxStats;
    private UserInGameAvgStatsDTO averageStats;

    private List<ChampionsUsedDTO> championsUsed;

    public static UserGeneralStatsDTO createFromDetails(List<PlayerMatchDetailEntity> details) {
        UserGeneralStatsDTO dto = new UserGeneralStatsDTO();
        if (details.isEmpty()) return dto;

        // Normal
        int normalGames = (int) details.stream()
                .filter(d -> !d.getMatch().getRanked() &&
                        "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                .count();
        int normalWins = (int) details.stream()
                .filter(d -> !d.getMatch().getRanked() &&
                        "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()) &&
                        d.getMatch().getWinnerTeam() != null &&
                        d.getMatch().getWinnerTeam().getId().equals(d.getTeam().getId()))
                .count();
        dto.setNormalGames(normalGames);
        dto.setNormalWins(normalWins);
        dto.setNormalWinRate(normalGames > 0 ? roundTwoDecimals(normalWins * 100.0 / normalGames) : 0.0);

        // ARAM
        int aramGames = (int) details.stream()
                .filter(d -> "ARAM - Howling Abyss".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                .count();
        int aramWins = (int) details.stream()
                .filter(d -> "ARAM - Howling Abyss".equalsIgnoreCase(d.getMatch().getMap().getMap()) &&
                        d.getMatch().getWinnerTeam() != null &&
                        d.getMatch().getWinnerTeam().getId().equals(d.getTeam().getId()))
                .count();
        dto.setAramGames(aramGames);
        dto.setAramWins(aramWins);
        dto.setAramWinRate(aramGames > 0 ? roundTwoDecimals(aramWins * 100.0 / aramGames) : 0.0);

        // Ranked
        int rankedGames = (int) details.stream()
                .filter(d -> d.getMatch().getRanked() &&
                        "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                .count();
        int rankedWins = (int) details.stream()
                .filter(d -> d.getMatch().getRanked() &&
                        "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()) &&
                        d.getMatch().getWinnerTeam() != null &&
                        d.getMatch().getWinnerTeam().getId().equals(d.getTeam().getId()))
                .count();
        dto.setRankedGames(rankedGames);
        dto.setRankedWins(rankedWins);
        dto.setRankedWinRate(rankedGames > 0 ? roundTwoDecimals(rankedWins * 100.0 / rankedGames) : 0.0);

        // Totales, promedios y máximos
        dto.setTotalStats(UserInGameTotalStatsDTO.createFromDetails(details));
        dto.setAverageStats(UserInGameAvgStatsDTO.createFromDetails(details));
        dto.setMaxStats(UserMaxStatsDTO.createFromDetails(details));
        dto.setChampionsUsed(ChampionsUsedDTO.createFromDetails(details));


        return dto;
    }

    public ChampionsUsedDTO getMostUsedChampion() {
        if (championsUsed == null || championsUsed.isEmpty()) return null;

        return championsUsed.stream()
                .max(Comparator.comparingInt(c ->
                        (c.getNormalGames() != null ? c.getNormalGames() : 0) +
                                (c.getAramGames() != null ? c.getAramGames() : 0) +
                                (c.getRankedGames() != null ? c.getRankedGames() : 0)
                ))
                .orElse(null);
    }

    private static double roundTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
