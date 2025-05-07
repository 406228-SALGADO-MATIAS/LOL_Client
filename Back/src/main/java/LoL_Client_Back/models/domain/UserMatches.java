package LoL_Client_Back.models.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMatches {
    private Long id;
    private Integer normalGamesPlayed;
    private Integer normalWins;
    private Integer normalLosses;
    private Integer rankedsPlayed;
    private Integer rankedWins;
    private Integer rankedLosses;
    private Integer aramsPlayed;
    private Integer aramWins;
    private Integer aramLosses;
    private User user;
}
