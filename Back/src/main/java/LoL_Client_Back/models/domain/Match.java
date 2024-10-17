package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.Map;
import LoL_Client_Back.models.reference.Team;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class Match {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime date;
    private String duration;
    private Boolean ranked;
    private Map map;
    private Team team;

}
