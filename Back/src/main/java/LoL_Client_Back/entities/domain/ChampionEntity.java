package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.ChampionDifficultyEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.ChampionTierPriceEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "release_date")
    private LocalDate releaseDate;
    private Double winrate;
    @Lob
    private String image;
    @JoinColumn
    @ManyToOne
    private RoleEntity role;
    @JoinColumn
    @ManyToOne
    private RoleEntity role2;
    @JoinColumn
    @ManyToOne
    private ChampionDifficultyEntity difficulty;
    @JoinColumn
    @ManyToOne
    private ChampionStyleEntity style;
    @JoinColumn
    @ManyToOne
    private ChampionStyleEntity style2;
    @JoinColumn
    @ManyToOne
    private ChampionTierPriceEntity price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChampionEntity that = (ChampionEntity) o;

        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

}
