package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionStyleRepository extends JpaRepository<ChampionStyleEntity,Long> {
}
