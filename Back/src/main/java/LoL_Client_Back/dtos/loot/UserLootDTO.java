package LoL_Client_Back.dtos.loot;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class UserLootDTO {
    private Long id;
    private Long userId;
    private Integer chests;
    private Integer masterChests;
    private Integer keys;
    private Integer orangeEssence;
    private Integer userBlueEssence;
    List<LootInventoryChampionDTO> championsInventory;
    List<LootInventorySkinDTO> skinsInventory;
    List<LootInventoryIconDTO> iconsInventory;
    List<NewItemDTO> itemsEnchanted;

}
