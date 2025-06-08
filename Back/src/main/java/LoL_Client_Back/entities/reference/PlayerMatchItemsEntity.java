package LoL_Client_Back.entities.reference;

import LoL_Client_Back.entities.domain.ItemEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
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
    private Long id;

    @JoinColumn(name = "player_match")
    @ManyToOne
    private PlayerMatchDetailEntity playerMatch;

    @JoinColumn
    @ManyToOne
    private ItemEntity item;

}
