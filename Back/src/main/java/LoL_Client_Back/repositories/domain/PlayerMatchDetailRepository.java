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
    @Query("""
    SELECT p.champion.id,
           SUM(CASE WHEN p.team = m.winnerTeam THEN 1 ELSE 0 END) as wins,
           COUNT(p) as total
    FROM PlayerMatchDetailEntity p
    JOIN p.match m
    GROUP BY p.champion.id
""")
    List<Object[]> calculateChampionWinrates();
    @Query("""
    SELECT SUM(CASE WHEN p.team = m.winnerTeam THEN 1 ELSE 0 END),
           COUNT(p)
    FROM PlayerMatchDetailEntity p
    JOIN p.match m
    WHERE p.champion.id = :championId
""")
    List<Object[]> calculateChampionStats(@Param("championId") Long championId);





}
