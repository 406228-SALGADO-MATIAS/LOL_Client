package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.ChampionTierPriceEntity;
import LoL_Client_Back.models.reference.ChampionTierPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChampionTierPriceRepository extends JpaRepository<ChampionTierPriceEntity,Long> {
    Optional<ChampionTierPriceEntity>  findByBlueEssenceCost (Integer blueEssenceCost);
}
