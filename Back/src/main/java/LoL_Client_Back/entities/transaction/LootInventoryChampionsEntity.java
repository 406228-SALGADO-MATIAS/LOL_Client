package LoL_Client_Back.entities.transaction;
import LoL_Client_Back.entities.domain.ChampionEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loot_inventory_champions")
public class LootInventoryChampionsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "acquisition_date")
    private LocalDateTime acquisitionDate;

    @Column(name = "removal_date")
    private LocalDateTime removalDate;

    @ManyToOne
    @JoinColumn
    private UserLootEntity loot;

    @ManyToOne
    @JoinColumn
    private ChampionEntity champion;
}
