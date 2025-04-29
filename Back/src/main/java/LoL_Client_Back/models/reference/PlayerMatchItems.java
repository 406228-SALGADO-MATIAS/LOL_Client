package LoL_Client_Back.models.reference;

import LoL_Client_Back.entities.domain.ItemEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerMatchItems {
    private Long id;

    private ItemEntity itemSlot1;

    private ItemEntity itemSlot2;

    private ItemEntity itemSlot3;

    private ItemEntity itemSlot4;

    private ItemEntity itemSlot5;

    private ItemEntity itemSlot6;
}
