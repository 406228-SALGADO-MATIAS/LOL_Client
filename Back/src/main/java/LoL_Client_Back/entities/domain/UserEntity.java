package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
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
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    @Column(name = "registration_date")
    private LocalDateTime registrationDate;
    @Column(name = "blue_essence")
    private Integer blueEssence;
    @Column(name = "riot_points")
    private Integer riotPoints;
    @JoinColumn
    @ManyToOne
    private RankTierEntity rank;
    @JoinColumn
    @ManyToOne
    private ServerRegionEntity server;

}
