package LoL_Client_Back.entities.association;
import LoL_Client_Back.entities.domain.ItemEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "items_x_players")
public class ItemXPlayerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "slot_number")
    private Integer slotNumber;

    @ManyToOne
    @JoinColumn
    private ItemEntity item;

    @ManyToOne
    @JoinColumn(name = "match_detail")

    private PlayerMatchDetailEntity matchDetail;
}
