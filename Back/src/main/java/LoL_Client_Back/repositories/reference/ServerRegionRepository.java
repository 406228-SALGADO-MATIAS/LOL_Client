package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.ServerRegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServerRegionRepository extends JpaRepository<ServerRegionEntity,Long> {
    Optional<ServerRegionEntity> findByServer(String server);
}
