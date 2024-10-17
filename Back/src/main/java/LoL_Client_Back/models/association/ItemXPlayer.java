package LoL_Client_Back.models.association;

import LoL_Client_Back.models.domain.Item;
import LoL_Client_Back.models.domain.PlayerMatchDetail;
import lombok.Data;

@Data
public class ItemXPlayer {
    private Long id;
    private Integer slotNumber;
    private Item item;
    private PlayerMatchDetail matchDetail;
}
