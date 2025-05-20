package LoL_Client_Back.dtos.items;

import LoL_Client_Back.models.reference.ChampionStyle;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemDTO {
    @Schema(hidden = true)
    private Long id;

    @Schema(example = "ITEM NAME")
    private String name;

    private Integer attackDamage;

    @Schema(example = "0%")
    private String criticalStrikeChance;

    @Schema(example = "0%")
    private String attackSpeed;

    private Integer abilityPower;

    private Integer health;

    @Schema(example = "0%")
    private String healthRegeneration;

    private Integer mana;

    @Schema(example = "0%")
    private String manaRegeneration;

    private Integer armor;

    @Schema(example = "0%")
    private String tenacity;

    private Integer magicResistance;

    private Integer coolDownReduction;

    @Schema(example = "0%")
    private String movementSpeed;

    @Schema(example = "0%")
    private String lifeSteal;

    @Schema(example = "0%")
    private String armorPenetration;

    @Schema(example = "0%")
    private String magicPenetration;

    private Integer lethality;

    @Schema(example = "0%")
    private String healingAndShieldPower;

    @Schema(example = "IMAGE URL")
    @Lob
    private String image;

    @Schema(example = "EFFECT")
    @Lob
    private String effect;

    private Integer cost;

    @Schema(hidden = true)
    private String itemType;

    @Schema(hidden = true)
    private String itemType2;

    public Integer getAttackDamage() {
        return attackDamage != null && attackDamage == 0 ? null : attackDamage;
    }

    public String getCriticalStrikeChance() {
        return "0%".equals(criticalStrikeChance) ? null : criticalStrikeChance;
    }

    public String getAttackSpeed() {
        return "0%".equals(attackSpeed) ? null : attackSpeed;
    }

    public Integer getAbilityPower() {
        return abilityPower != null && abilityPower == 0 ? null : abilityPower;
    }

    public Integer getHealth() {
        return health != null && health == 0 ? null : health;
    }

    public String getHealthRegeneration() {
        return "0%".equals(healthRegeneration) ? null : healthRegeneration;
    }

    public Integer getMana() {
        return mana != null && mana == 0 ? null : mana;
    }

    public String getManaRegeneration() {
        return "0%".equals(manaRegeneration) ? null : manaRegeneration;
    }

    public Integer getArmor() {
        return armor != null && armor == 0 ? null : armor;
    }

    public String getTenacity() {
        return "0%".equals(tenacity) ? null : tenacity;
    }

    public Integer getMagicResistance() {
        return magicResistance != null && magicResistance == 0 ? null : magicResistance;
    }

    public Integer getCoolDownReduction() {
        return coolDownReduction != null && coolDownReduction == 0 ? null : coolDownReduction;
    }

    public String getMovementSpeed() {
        return "0%".equals(movementSpeed) ? null : movementSpeed;
    }

    public String getLifeSteal() {
        return "0%".equals(lifeSteal) ? null : lifeSteal;
    }

    public String getArmorPenetration() {
        return "0%".equals(armorPenetration) ? null : armorPenetration;
    }

    public String getMagicPenetration() {
        return "0%".equals(magicPenetration) ? null : magicPenetration;
    }

    public Integer getLethality() {
        return lethality != null && lethality == 0 ? null : lethality;
    }

    public String getHealingAndShieldPower() {
        return "0%".equals(healingAndShieldPower) ? null : healingAndShieldPower;
    }

}
