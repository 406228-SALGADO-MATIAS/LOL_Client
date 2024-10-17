package LoL_Client_Back.repositories.transaction;

import LoL_Client_Back.entities.transaction.UserLootEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLootRepository extends JpaRepository<UserLootEntity,Long> {
}
