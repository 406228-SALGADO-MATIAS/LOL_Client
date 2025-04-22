package LoL_Client_Back.entities.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_matches")
public class UserMatchesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "normal_games_played")
    private Integer normalGamesPlayed;

    @Column(name = "normal_wins")
    private Integer normalWins;

    @Column(name = "normal_losses")
    private Integer normalLosses;

    @Column(name = "rankeds_played")
    private Integer rankedsPlayed;

    @Column(name = "ranked_wins")
    private Integer rankedWins;

    @Column(name = "ranked_losses")
    private Integer rankedLosses;

    @Column(name = "arams_played")
    private Integer aramsPlayed;

    @Column(name = "aram_wins")
    private Integer aramWins;

    @Column(name = "aram_losses")
    private Integer aramLosses;

    @JoinColumn(name ="`user`")
    @ManyToOne
    private UserEntity user;

}
