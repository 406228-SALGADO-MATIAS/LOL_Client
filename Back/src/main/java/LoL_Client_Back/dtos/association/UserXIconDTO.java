package LoL_Client_Back.dtos.association;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserXIconDTO extends UserXDTO{
    private Long idIcon;
    private String icon;
}
