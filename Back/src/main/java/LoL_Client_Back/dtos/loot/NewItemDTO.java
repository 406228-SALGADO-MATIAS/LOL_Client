package LoL_Client_Back.dtos.loot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewItemDTO {
    String image;
    String name;
    boolean isActive;
}
