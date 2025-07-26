package LoL_Client_Back.entities.transaction;
import LoL_Client_Back.entities.domain.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "orange_essence")
    private Integer orangeEssence = 1050;

    @ManyToOne
    @JoinColumn
    private UserEntity user;

    @OneToMany(mappedBy = "loot", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LootInventorySkinsEntity> skins = new ArrayList<>();

    @OneToMany(mappedBy = "loot", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LootInventoryIconsEntity> icons = new ArrayList<>();

    @OneToMany(mappedBy = "loot", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LootInventoryChampionsEntity> champions = new ArrayList<>();

    // SKINS
    public void addLootSkin(LootInventorySkinsEntity skin) {
        skins.add(skin);
        skin.setLoot(this);
    }

    public void removeLootSkin(LootInventorySkinsEntity skin) {
        skins.remove(skin);
        skin.setLoot(null);
    }

    // ICONS
    public void addLootIcon(LootInventoryIconsEntity icon) {
        icons.add(icon);
        icon.setLoot(this);
    }

    public void removeLootIcon(LootInventoryIconsEntity icon) {
        icons.remove(icon);
        icon.setLoot(null);
    }

    // CHAMPIONS
    public void addLootChampion(LootInventoryChampionsEntity champion) {
        champions.add(champion);
        champion.setLoot(this);
    }

    public void removeLootChampion(LootInventoryChampionsEntity champion) {
        champions.remove(champion);
        champion.setLoot(null);
    }

}
