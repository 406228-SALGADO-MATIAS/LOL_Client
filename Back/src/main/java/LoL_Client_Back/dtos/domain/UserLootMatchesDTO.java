package LoL_Client_Back.dtos.domain;


import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.reference.RankTier;
import LoL_Client_Back.models.reference.ServerRegion;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLootMatchesDTO {
    private Long user_id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationDate;
    private RankTier rank;
    private String server;

    private Long loot_id;
    private Integer chests;
    private Integer keys;

    private Long matches_id;
    private Integer normalGamesPlayed;
    private Integer rankedsPlayed;
    private Integer aramsPlayed;

}
