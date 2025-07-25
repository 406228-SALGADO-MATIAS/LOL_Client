package LoL_Client_Back.entities.reference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "skin_tiers")
public class SkinTierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String tier;
    @Column(name = "rp_cost")
    private Integer rpCost;
    @Column(name = "orange_essence_cost")
    private Integer orangeEssenceCost;
    @Column(name ="disenchant_orange_essence")
    private Integer disenchantOrangeEssence;
}
