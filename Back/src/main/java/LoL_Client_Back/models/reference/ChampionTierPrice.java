package LoL_Client_Back.models.reference;

import lombok.Data;

@Data
public class ChampionTierPrice {
    private Long id;
    private Integer rpCost;
    private Integer blueEssenceCost;
    private Integer disenchantBlueEssence;
}
