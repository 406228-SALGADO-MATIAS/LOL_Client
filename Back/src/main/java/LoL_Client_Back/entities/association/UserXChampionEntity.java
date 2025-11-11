package LoL_Client_Back.entities.association;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users_x_champions", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "champion_id"}))
public class UserXChampionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "mastery_level")
    private Integer masteryLevel;

    @Column(name = "adquisition_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime adquisitionDate;

    @ManyToOne
    @JoinColumn(nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private ChampionEntity champion;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserXChampionEntity that)) return false;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
