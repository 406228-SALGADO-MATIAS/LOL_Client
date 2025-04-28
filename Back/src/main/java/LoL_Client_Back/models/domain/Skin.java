package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.SkinTier;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data

public class Skin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime releaseDate;
    @Lob
    private String image;
    private SkinTier tier;
    private Champion champion;
}
