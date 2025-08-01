package LoL_Client_Back.repositories.transaction;

import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LootInventorySkinsRepository extends JpaRepository<LootInventorySkinsEntity,Long> {
    List<LootInventorySkinsEntity> findByLootAndIsActiveTrue(UserLootEntity loot);
    @Query("SELECT l.loot FROM LootInventorySkinsEntity l WHERE l.id = :id")
    Optional<UserLootEntity> findUserLootByLootInventorySkinId(@Param("id") Long id);

    List<LootInventorySkinsEntity> findByLoot_UserAndSkin(UserEntity user, SkinEntity skin);

    List<LootInventorySkinsEntity> findByLoot_User(UserEntity user);

    List<LootInventorySkinsEntity> findBySkin(SkinEntity skin);

}
