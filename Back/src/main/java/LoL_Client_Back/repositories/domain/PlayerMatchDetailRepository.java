package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerMatchDetailRepository extends JpaRepository<PlayerMatchDetailEntity,Long> {
    @Query("SELECT p.match FROM PlayerMatchDetailEntity p WHERE p.champion.id = :championId")
    List<MatchEntity> findMatchesByChampionId(@Param("championId") Long championId);
    @Query("SELECT p.match FROM PlayerMatchDetailEntity p WHERE p.user.id = :userId")
    List<MatchEntity> findMatchesByUserId(@Param("userId") Long userId);
}
