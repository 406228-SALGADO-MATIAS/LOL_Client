package LoL_Client_Back.dtos.match.playerHistory;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class PlayerMatchItemDTO {
    private Long id;
    private String itemName;
    @Lob
    private String image;
}
