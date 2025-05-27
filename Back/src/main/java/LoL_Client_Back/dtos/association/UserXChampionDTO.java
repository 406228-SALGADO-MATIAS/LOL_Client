package LoL_Client_Back.dtos.association;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserXChampionDTO extends UserXDTO{
    private Long championId;
    private String championName;
}
