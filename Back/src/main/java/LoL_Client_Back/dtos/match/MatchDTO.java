package LoL_Client_Back.dtos.match;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchDTO {
    private Long id;
    private String duration;
    private String serverRegion;
    private Boolean ranked;
    private String map;
    private Integer blueTeamKills;
    private Integer redTeamKills;
    private String winnerTeam;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime date;
    private List<PlayerMatchDetailDTO> players;
}
