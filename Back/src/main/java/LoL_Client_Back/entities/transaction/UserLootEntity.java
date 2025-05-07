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

    private Integer chests = 1;

    @Column(name = "master_chests")
    private Integer masterChests = 0;

    private Integer keys = 1;

    @Column(name = "key_fragments")
    private Integer keyFragments = 0;

    @Column(name = "orange_essence")
    private Integer orangeEssence = 1050;

    @ManyToOne
    @JoinColumn
    private UserEntity user;
    
}
