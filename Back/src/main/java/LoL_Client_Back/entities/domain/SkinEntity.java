package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.SkinTierEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "skins")
public class SkinEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "release_date")
    private LocalDateTime releaseDate;
    @Lob
    private String image;
    @JoinColumn
    @ManyToOne
    private SkinTierEntity tier;
    @JoinColumn
    @ManyToOne
    private ChampionEntity champion;

}
