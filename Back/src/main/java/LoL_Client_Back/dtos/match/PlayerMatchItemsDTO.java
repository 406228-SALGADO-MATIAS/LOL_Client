package LoL_Client_Back.dtos.match;

import LoL_Client_Back.dtos.ItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerMatchItemsDTO {
    private Long id;
    private Long idMatchDetail;
    private Long idItem;
    private String itemName;
    private String itemType;
    private String itemType2;
}
