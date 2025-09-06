package LoL_Client_Back.dtos.userStats;

import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import jakarta.persistence.Lob;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ChampionsUsedDTO {
    private String champion;
    private Long id;
    @Lob
    private String image;
    private Integer normalGames;
    private Integer aramGames;
    private Integer rankedGames;

    public static List<ChampionsUsedDTO> createFromDetails(List<PlayerMatchDetailEntity> details) {
        return details.stream()
                .collect(Collectors.groupingBy(d -> d.getChampion().getName()))
                .entrySet().stream()
                .map(entry -> {
                    ChampionsUsedDTO dto = new ChampionsUsedDTO();
                    dto.setChampion(entry.getKey());
                    dto.setId(entry.getValue().get(0).getChampion().getId());
                    dto.setImage(entry.getValue().get(0).getChampion().getImage());
                    dto.setNormalGames((int) entry.getValue().stream()
                            .filter(d -> !d.getMatch().getRanked() &&
                                    "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                            .count());
                    dto.setAramGames((int) entry.getValue().stream()
                            .filter(d -> "ARAM - Howling Abyss".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                            .count());
                    dto.setRankedGames((int) entry.getValue().stream()
                            .filter(d -> d.getMatch().getRanked() &&
                                    "SUMMONERS RIFT".equalsIgnoreCase(d.getMatch().getMap().getMap()))
                            .count());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
