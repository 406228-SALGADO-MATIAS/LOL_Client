package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.ItemType;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class Item {
    private Long id;
    private String name;
    private Integer attackDamage;
    private String criticalStrikeChance;
    private String attackSpeed;
    private Integer abilityPower;
    private Integer health;
    private String healthRegeneration;
    private Integer mana;
    private String manaRegeneration;
    private Integer armor;
    private String tenacity;
    private Integer magicResistance;
    private Integer coolDownReduction;
    private String movementSpeed;
    private String lifeSteal;
    private String armorPenetration;
    private String magicPenetration;
    private Integer lethality;
    private String healingAndShieldPower;
    @Lob
    private String image;
    private String effect;
    private Integer cost;
    private ItemType itemType;
}
