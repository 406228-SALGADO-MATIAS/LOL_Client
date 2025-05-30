package LoL_Client_Back.entities.reference;
import LoL_Client_Back.models.reference.ChampionTierPrice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profile_icons")
public class ProfileIconEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String icon;
    private String image;
    @ManyToOne
    @JoinColumn
    private ChampionTierPriceEntity price;
}
