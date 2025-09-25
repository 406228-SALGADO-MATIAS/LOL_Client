package LoL_Client_Back.dtos.match.playerHistory;

import lombok.Data;

@Data
public class StyleRatiosDTO {
    private Double fighterRatio = 0.0;
    private Double marksmanRatio = 0.0;
    private Double mageRatio = 0.0;
    private Double assassinRatio = 0.0;
    private Double tankRatio = 0.0;
    private Double supportRatio = 0.0;

}
