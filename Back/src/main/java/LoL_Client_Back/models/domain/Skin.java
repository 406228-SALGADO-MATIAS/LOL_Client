package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.SkinTier;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class Skin {
    private Long id;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime releaseDate;
    private String image;
    private SkinTier tier;
    private Champion champion;
}
