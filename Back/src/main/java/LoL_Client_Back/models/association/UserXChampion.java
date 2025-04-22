package LoL_Client_Back.models.association;


import LoL_Client_Back.models.domain.Champion;
import LoL_Client_Back.models.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserXChampion {
    private Long id;
    private Integer masteryLevel;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime adquisitionDate;
    private User user;
    private Champion champion;
}
