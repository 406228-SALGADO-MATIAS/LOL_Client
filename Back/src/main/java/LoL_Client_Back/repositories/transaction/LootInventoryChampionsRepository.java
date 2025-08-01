package LoL_Client_Back.repositories.transaction;

import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LootInventoryChampionsRepository extends JpaRepository<LootInventoryChampionsEntity,Long> {
    List<LootInventoryChampionsEntity> findByLootAndIsActiveTrue(UserLootEntity loot);
    @Query("SELECT l.loot FROM LootInventoryChampionsEntity l WHERE l.id = :id")
    Optional<UserLootEntity> findUserLootByLootInventoryChampionId(@Param("id") Long id);

    List<LootInventoryChampionsEntity> findByLoot_UserAndChampion(UserEntity user, ChampionEntity champion);
    List<LootInventoryChampionsEntity> findByLoot_User(UserEntity user);
    List<LootInventoryChampionsEntity> findByChampion(ChampionEntity champion);


}
