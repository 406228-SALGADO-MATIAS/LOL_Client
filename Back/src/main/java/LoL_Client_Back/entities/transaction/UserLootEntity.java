package LoL_Client_Back.entities.transaction;
import LoL_Client_Back.entities.domain.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_loots")
public class UserLootEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Integer chests;

    @Column(name = "master_chests")
    private Integer masterChests;

    private Integer keys;

    @Column(name = "key_fragments")
    private Integer keyFragments;

    @Column(name = "orange_essence")
    private Integer orangeEssence;

    @Column(name = "blue_essence")
    private Integer blueEssence;

    @ManyToOne
    @JoinColumn
    private UserEntity user;
}
