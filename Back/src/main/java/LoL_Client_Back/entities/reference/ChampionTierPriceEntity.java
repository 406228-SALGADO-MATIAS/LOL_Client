package LoL_Client_Back.entities.reference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "champions_tier_prices")
public class ChampionTierPriceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "rp_cost")
    private Integer rpCost;
    @Column(name = "blue_essence_cost")
    private Integer blueEssenceCost;
    @Column(name = "enchant_price")
    private Integer enchantPrice;
    @Column(name ="disenchant_blue_essence")
    private Integer disenchantBlueEssence;
}
