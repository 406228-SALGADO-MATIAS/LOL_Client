package LoL_Client_Back.entities.association;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users_x_skins", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skin_id"}))
public class UserXSkinEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "adquisition_date")
    private LocalDateTime adquisitionDate;

    @ManyToOne
    @JoinColumn
    private UserEntity user;

    @ManyToOne
    @JoinColumn
    private SkinEntity skin;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserXSkinEntity that)) return false;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
