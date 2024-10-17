package LoL_Client_Back.entities.domain;
import LoL_Client_Back.entities.reference.ItemTypeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "items")
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @Column(name = "attack_damage")
    private Integer attackDamage;
    @Column(name = "critical_strike_chance")
    private String criticalStrikeChance;
    @Column(name = "attack_speed")
    private String attackSpeed;
    @Column(name = "ability_power")
    private Integer abilityPower;
    private Integer health;
    private Integer mana;
    private Integer armor;
    @Column(name = "magic_resistance")
    private Integer magicResistance;
    @Column(name = "cool_down_reduction")
    private Integer coolDownReduction;
    @Column(name = "movement_speed")
    private String movementSpeed;
    @Column(name = "life_steal")
    private String lifeSteal;
    @Column(name = "armor_penetration")
    private String armorPenetration;
    @Column(name = "magic_penetration")
    private String magicPenetration;
    private Integer letality;
    @Column(name = "healing_and_shield_power")
    private String healingAndShieldPower;
    private String image;
    @JoinColumn
    @ManyToOne
    @Column(name = "item_type")
    private ItemTypeEntity itemType;

}
