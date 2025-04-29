package LoL_Client_Back.entities.reference;

import LoL_Client_Back.entities.domain.ItemEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "player_match_items")
@AllArgsConstructor
@NoArgsConstructor

public class PlayerMatchItemsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot1;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot2;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot3;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot4;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot5;
    @ManyToOne
    @JoinColumn
    private ItemEntity itemSlot6;

}
