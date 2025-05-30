package LoL_Client_Back.dtos.reference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileIconDTO {
    private Long id;
    private String icon;
    private String image;
    private Integer blueEssencePrice;
}
