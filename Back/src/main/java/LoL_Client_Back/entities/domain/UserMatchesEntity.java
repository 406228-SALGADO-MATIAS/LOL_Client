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

    @JoinColumn
    @ManyToOne
    private UserEntity user;

    @Column(name = "normal_games_played")
    private Integer normalGamesPlayed = 0;

    @Column(name = "normal_wins")
    private Integer normalWins = 0;

    @Column(name = "normal_losses")
    private Integer normalLosses = 0;

    @Column(name = "rankeds_played")
    private Integer rankedsPlayed = 0;

    @Column(name = "ranked_wins")
    private Integer rankedWins = 0;

    @Column(name = "ranked_losses")
    private Integer rankedLosses = 0;

    @Column(name = "arams_played")
    private Integer aramsPlayed = 0;

    @Column(name = "aram_wins")
    private Integer aramWins = 0;

    @Column(name = "aram_losses")
    private Integer aramLosses = 0;



}
