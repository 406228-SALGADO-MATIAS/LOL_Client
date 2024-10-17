package LoL_Client_Back.models.domain;

import LoL_Client_Back.models.reference.ItemType;
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
    private Integer mana;
    private Integer armor;
    private Integer magicResistance;
    private Integer coolDownReduction;
    private String movementSpeed;
    private String lifeSteal;
    private String armorPenetration;
    private String magicPenetration;
    private Integer lethality;
    private String healingAndShieldPower;
    private String image;
    private ItemType itemType;
}
