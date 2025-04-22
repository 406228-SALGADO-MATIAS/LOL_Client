package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.ChampionDifficultyEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "champions")
public class ChampionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private Integer price;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "release_date")
    private LocalDateTime releaseDate;
    private Double winrate;
    @Lob
    private String image;
    @JoinColumn
    @ManyToOne
    private RoleEntity role;
    @JoinColumn
    @ManyToOne
    private ChampionDifficultyEntity difficulty;
    @JoinColumn
    @ManyToOne
    private ChampionStyleEntity style;
    @JoinColumn
    @ManyToOne
    private ChampionStyleEntity style2;

}
