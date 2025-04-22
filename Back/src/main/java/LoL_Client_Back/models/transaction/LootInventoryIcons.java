package LoL_Client_Back.models.transaction;

import LoL_Client_Back.models.reference.ProfileIcon;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LootInventoryIcons {
    private Long id;
    private Boolean isActive;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime acquisitionDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime removalDate;
    private UserLoot loot;
    private ProfileIcon icon;
}
