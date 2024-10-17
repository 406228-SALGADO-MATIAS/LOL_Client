package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.MapEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
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
@Table(name = "matches")
public class MatchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime date;
    private String duration;
    private Boolean ranked;
    @JoinColumn
    @ManyToOne
    private MapEntity map;
    @JoinColumn
    @ManyToOne
    private TeamEntity team;

}
