package LoL_Client_Back.models.association;

import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.models.reference.ProfileIcon;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserXIcon {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime adquisitionDate;
    private User user;
    private ProfileIcon icon;
}
