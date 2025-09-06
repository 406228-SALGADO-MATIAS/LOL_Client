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

    // Todos los detalles del usuario
    @Query("SELECT p FROM PlayerMatchDetailEntity p WHERE p.user.id = :userId")
    List<PlayerMatchDetailEntity> findByUserId(@Param("userId") Long userId);

    // Por tipo de partida (NORMAL, RANKED, ARAM)
    @Query("SELECT p FROM PlayerMatchDetailEntity p " +
            "WHERE p.user.id = :userId " +
            "AND ((:gameType = 'NORMAL' AND p.match.ranked = false AND p.match.map.map = 'SUMMONERS RIFT') " +
            "     OR (:gameType = 'RANKED' AND p.match.ranked = true AND p.match.map.map = 'SUMMONERS RIFT') " +
            "     OR (:gameType = 'ARAM' AND p.match.map.map = 'ARAM'))")
    List<PlayerMatchDetailEntity> findByUserAndGameType(@Param("userId") Long userId,
                                                        @Param("gameType") String gameType);

    // Por campeón
    @Query("SELECT p FROM PlayerMatchDetailEntity p " +
            "WHERE p.user.id = :userId AND p.champion.id = :championId")
    List<PlayerMatchDetailEntity> findByUserAndChampion(@Param("userId") Long userId,
                                                        @Param("championId") Long championId);

    // Por rol (excluyendo ARAM)
    @Query("SELECT p FROM PlayerMatchDetailEntity p " +
            "WHERE p.user.id = :userId " +
            "AND p.role.id = :roleId " +
            "AND NOT (p.match.ranked = false AND p.match.map.map = 'ARAM')")
    List<PlayerMatchDetailEntity> findByUserAndRoleExcludeAram(
            @Param("userId") Long userId,
            @Param("roleId") Long roleId);


    // Por campeón + rol (excluyendo ARAM)
    @Query("SELECT p FROM PlayerMatchDetailEntity p " +
            "WHERE p.user.id = :userId " +
            "AND p.champion.id = :championId " +
            "AND p.role.id = :roleId " +
            "AND NOT (p.match.ranked = false AND p.match.map.map = 'ARAM')")
    List<PlayerMatchDetailEntity> findByUserChampionAndRoleExcludeAram(
            @Param("userId") Long userId,
            @Param("championId") Long championId,
            @Param("roleId") Long roleId);



}
