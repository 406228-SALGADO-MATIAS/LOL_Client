package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.dtos.enums.ChampionDifficulty;
import LoL_Client_Back.entities.reference.ChampionDifficultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChampionDifficultyRepository extends JpaRepository<ChampionDifficultyEntity,Long> {
    Optional<ChampionDifficultyEntity> findByDifficultyIgnoreCase(String difficulty);
}
