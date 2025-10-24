package LoL_Client_Back.dtos.user;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String nickname;
    private String server;
    @Lob
    private String iconImage = "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761336571/none_ep19ag.jpg";
    @Lob
    private String userBackground ="";
    private Integer riotPoints;
    private Integer blueEssence;
    private String rank = "Unranked";
    @Lob
    private String rankImage = "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339061/Unranked_ydrybu.webp";
    private int lp = 0;
}
