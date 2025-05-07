package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.ChampionDifficulty;
import LoL_Client_Back.models.reference.ChampionStyle;
import LoL_Client_Back.models.reference.ChampionTierPrice;
import LoL_Client_Back.models.reference.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Lob;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Champion {
    private Long id;
    private String name;
    private ChampionTierPrice price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime releaseDate;
    private Double winrate;
    @Lob
    private String image;
    private Role role;
    private Role role2;
    private ChampionDifficulty difficulty;
    private ChampionStyle style;
    private ChampionStyle style2;
}
