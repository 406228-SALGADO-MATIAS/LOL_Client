package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.RankTierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RankTierRepository extends JpaRepository<RankTierEntity,Long> {
    Optional<RankTierEntity> findByRank (String rank);
}
