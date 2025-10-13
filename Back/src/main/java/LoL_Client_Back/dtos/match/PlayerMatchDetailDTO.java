package LoL_Client_Back.dtos.match;

import LoL_Client_Back.dtos.match.playerMatch.RewardDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerMatchDetailDTO {
    private Long id;
    private Long matchId;
    private String teamMember;
    private String role;
    private String champion;
    private Integer kills;
    private Integer deaths;
    private Integer assists;
    private Long idUser;
    private String elo;
    private String userNickname;
    @Lob
    private String imageUrlChampion;
    private Integer creaturesKilled;
    private Integer totalGold;
    private Integer totalDamage;
    private List<PlayerMatchItemDTO> items;
    private RewardDTO rewards;
}
