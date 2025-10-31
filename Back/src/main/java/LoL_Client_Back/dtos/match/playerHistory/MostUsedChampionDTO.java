package LoL_Client_Back.dtos.match.playerHistory;

import lombok.Data;

@Data
public class MostUsedChampionDTO {
    private String name;
    private String imageSquare;
    private double useRatio;
}
