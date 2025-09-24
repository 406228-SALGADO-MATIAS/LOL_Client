package LoL_Client_Back.dtos.match;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class PlayerMatchHistoryItemDTO {
    private Long id;
    private String itemName;
    @Lob
    private String image;
}
