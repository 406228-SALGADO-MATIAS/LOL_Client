package LoL_Client_Back.entities.domain;
import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
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
    @Column(name = "health_regeneration")
    private String healthRegeneration;
    private Integer mana;
    @Column(name = "mana_regeneration")
    private String manaRegeneration;
    private Integer armor;
    private String tenacity;
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
    private Integer lethality;
    @Column(name = "healing_and_shield_power")
    private String healingAndShieldPower;
    @Lob
    private String image;
    @Lob
    private String effect;
    private Integer cost;
    @JoinColumn(name = "item_type")
    @ManyToOne
    private ChampionStyleEntity itemType;
    @JoinColumn(name = "item_type2")
    @ManyToOne
    private ChampionStyleEntity itemType2;

}
