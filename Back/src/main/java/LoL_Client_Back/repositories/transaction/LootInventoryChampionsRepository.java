package LoL_Client_Back.repositories.transaction;

import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LootInventoryChampionsRepository extends JpaRepository<LootInventoryChampionsEntity,Long> {
}
