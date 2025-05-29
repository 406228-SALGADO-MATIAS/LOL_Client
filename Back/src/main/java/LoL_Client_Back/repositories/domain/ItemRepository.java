package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.entities.domain.ItemEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity,Long> {
    List<ItemEntity> findByNameIgnoreCaseContaining(String name);
    List<ItemEntity> findByItemType(ChampionStyleEntity championStyle);
    List<ItemEntity> findByItemTypeOrItemType2 (ChampionStyleEntity c1, ChampionStyleEntity c2);
    boolean existsByNameIgnoreCase(String name);
    Optional<ItemEntity> findByNameIgnoreCase(String name);
}
