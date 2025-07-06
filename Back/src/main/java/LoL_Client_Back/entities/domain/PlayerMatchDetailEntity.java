package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.PlayerMatchItemsEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "player_match_details")
public class PlayerMatchDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Integer kills;
    private Integer deaths;
    private Integer assists;
    @Column(name = "total_gold")
    private Integer totalGold;
    @Column(name = "total_damage")
    private Integer totalDamage;
    @Column(name = "creatures_killed")
    private Integer creaturesKilled;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private MatchEntity match;

    @JoinColumn(name ="`user`")
    @ManyToOne
    private UserEntity user;

    @JoinColumn
    @ManyToOne
    private TeamEntity team;

    @JoinColumn
    @ManyToOne
    private ChampionEntity champion;

    @JoinColumn
    @ManyToOne
    private RoleEntity role;

    @OneToMany(mappedBy = "playerMatch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayerMatchItemsEntity> items = new ArrayList<>();

}
