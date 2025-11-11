package LoL_Client_Back.entities.association;


import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users_x_icons", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "icon_id"}))
public class UserXIconEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "adquisition_date")
    private LocalDateTime adquisitionDate;

    @ManyToOne
    @JoinColumn
    private UserEntity user;

    @ManyToOne
    @JoinColumn
    private ProfileIconEntity icon;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserXIconEntity that)) return false;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
