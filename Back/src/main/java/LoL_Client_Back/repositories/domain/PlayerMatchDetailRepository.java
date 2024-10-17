package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerMatchDetailRepository extends JpaRepository<PlayerMatchDetailEntity,Long> {
}
