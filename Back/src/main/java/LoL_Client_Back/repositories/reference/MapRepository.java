package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepository extends JpaRepository<MapEntity,Long> {
}
