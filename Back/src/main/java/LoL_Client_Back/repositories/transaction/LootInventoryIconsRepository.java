package LoL_Client_Back.repositories.transaction;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LootInventoryIconsRepository extends JpaRepository<LootInventoryIconsEntity,Long> {
    List<LootInventoryIconsEntity> findByLootAndIsActiveTrue(UserLootEntity loot);
    @Query("SELECT l.loot FROM LootInventoryIconsEntity l WHERE l.id = :id")
    Optional<UserLootEntity> findUserLootByLootInventoryIconId(@Param("id") Long id);

    List<LootInventoryIconsEntity> findByLoot_UserAndIcon(UserEntity user, ProfileIconEntity profileIcon);

    List<LootInventoryIconsEntity> findByLoot_User(UserEntity user);

    List<LootInventoryIconsEntity> findByIcon(ProfileIconEntity profileIcon);

}
