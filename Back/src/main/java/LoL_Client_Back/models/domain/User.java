package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.RankTier;
import LoL_Client_Back.models.reference.ServerRegion;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime registrationDate;
    private Integer blueEssence;
    private Integer riotPoints;
    private RankTier rank;
    private ServerRegion server;
}
