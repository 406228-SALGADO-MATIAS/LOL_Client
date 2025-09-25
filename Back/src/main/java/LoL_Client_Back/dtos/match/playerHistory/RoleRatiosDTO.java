package LoL_Client_Back.dtos.match.playerHistory;

import lombok.Data;

@Data
public class RoleRatiosDTO {
    private Double topRatio = 0.0;
    private Double jgRatio = 0.0;;
    private Double midRatio = 0.0;
    private Double adcRatio = 0.0;
    private Double supportRatio = 0.0;
}
