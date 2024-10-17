package LoL_Client_Back.repositories.association;

import LoL_Client_Back.entities.association.ItemXPlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemXPlayerRepository extends JpaRepository<ItemXPlayerEntity,Long> {
}

