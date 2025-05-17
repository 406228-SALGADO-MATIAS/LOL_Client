package LoL_Client_Back.dtos.user;


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
    private String rank = "UNRANKED";
    private String server;

    private Long loot_id;
    private Integer chests;
    private Integer keys;

    private Long matches_id;
    private Integer normalGamesPlayed = 0;
    private Integer rankedsPlayed = 0;
    private Integer aramsPlayed = 0;

}
