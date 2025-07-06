package LoL_Client_Back.dtos.match;

import LoL_Client_Back.dtos.user.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
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
    private String userNickname;
    private String teamMember;
    private String champion;
    private String role;
    private Integer kills;
    private Integer deaths;
    private Integer assists;
    private List<PlayerMatchItemsDTO> items;
}
