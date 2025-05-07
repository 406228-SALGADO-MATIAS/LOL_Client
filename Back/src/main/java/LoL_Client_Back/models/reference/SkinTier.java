package LoL_Client_Back.models.reference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkinTier {
    private Long id;
    private String tier;
    private Integer rpCost;
    private Integer orangeEssenceCost;
    private Integer disenchantOrangeEssence;
}
