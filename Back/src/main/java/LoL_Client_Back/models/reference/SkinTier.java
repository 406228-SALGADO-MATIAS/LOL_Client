package LoL_Client_Back.models.reference;

import lombok.Data;

@Data
public class SkinTier {
    private Long id;
    private String tier;
    private Integer price;
}
