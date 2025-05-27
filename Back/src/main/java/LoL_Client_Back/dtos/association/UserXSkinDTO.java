package LoL_Client_Back.dtos.association;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserXSkinDTO extends UserXDTO{
    private Long skinId;
    private Integer rpPrice;
    private String skinName;
}
