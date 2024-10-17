package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.ChampionDifficulty;
import LoL_Client_Back.models.reference.ChampionStyle;
import LoL_Client_Back.models.reference.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Champion {
    private Long id;
    private String name;
    private Integer price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime releaseDate;
    private Double winrate;
    private String image;
    private Role role;
    private ChampionDifficulty difficulty;
    private ChampionStyle style;
}
