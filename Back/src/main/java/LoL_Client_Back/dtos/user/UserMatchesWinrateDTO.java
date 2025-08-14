package LoL_Client_Back.dtos.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMatchesWinrateDTO {
    private Long user_id;
    private String nickname;
    private String rank = "UNRANKED";
    private String server;
    @Lob
    private String icon;
    private Integer rankedsPlayed;
    private Integer rankedWins;
    private Double rankedWinrate;
    private Integer normalGamesPlayed;
    private Integer normalWins;
    private Double normalWinrate;
    private Integer aramsPlayed;
    private Integer aramWins;
    private Double aramWinrate;

    @JsonProperty("rankedWinrate")
    public Double getRankedWinrate() {
        return rankedWinrate != null ? Math.round(rankedWinrate * 100.0) / 100.0 : null;
    }

    @JsonProperty("normalWinrate")
    public Double getNormalWinrate() {
        return normalWinrate != null ? Math.round(normalWinrate * 100.0) / 100.0 : null;
    }

    @JsonProperty("aramWinrate")
    public Double getAramWinrate() {
        return aramWinrate != null ? Math.round(aramWinrate * 100.0) / 100.0 : null;
    }

}
