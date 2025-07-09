package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.MapEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;
    private String duration;
    private Boolean ranked;
    private Integer blueTeamKills;
    private Integer redTeamKills;
    @JoinColumn
    @ManyToOne
    private MapEntity map;
    @JoinColumn
    @ManyToOne
    private TeamEntity winnerTeam;
    @JoinColumn
    @ManyToOne
    private ServerRegionEntity serverRegion;
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PlayerMatchDetailEntity> playerDetails = new ArrayList<>();

}
