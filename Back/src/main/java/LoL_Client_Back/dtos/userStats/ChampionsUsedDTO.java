package LoL_Client_Back.dtos.userStats;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class ChampionsUsedDTO {
    private String champion;
    @Lob
    private String image;
    private Integer normalGames;
    private Integer aramGames;
    private Integer rankedGames;
}
