package LoL_Client_Back.dtos.user;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private String nickname;
    private String server;
    @Lob
    private String iconImage = "";
    @Lob
    private String userBackground ="";
    private Integer riotPoints;
    private Integer blueEssence;
    private String rank = "Unranked";
}
