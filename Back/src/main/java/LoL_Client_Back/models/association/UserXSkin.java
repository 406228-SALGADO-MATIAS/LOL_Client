package LoL_Client_Back.models.association;

import LoL_Client_Back.models.domain.Skin;
import LoL_Client_Back.models.domain.User;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class UserXSkin {
    private Long id;
    private LocalDateTime adquisitionDate;
    private User user;
    private Skin skin;
}
