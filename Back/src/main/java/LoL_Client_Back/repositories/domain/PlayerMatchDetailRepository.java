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
           SUM(CASE WHEN p.team.id = m.winnerTeam.id THEN 1 ELSE 0 END) as wins,
           COUNT(p) as total
    FROM PlayerMatchDetailEntity p
    JOIN p.match m
    GROUP BY p.champion.id
""")
    List<Object[]> calculateChampionWinrates();
    @Query("""
    SELECT SUM(CASE WHEN p.team.id = m.winnerTeam.id THEN 1 ELSE 0 END),
           COUNT(p)
    FROM PlayerMatchDetailEntity p
    JOIN p.match m
    WHERE p.champion.id = :championId
""")
    List<Object[]> calculateChampionStats(@Param("championId") Long championId);

    // Todos los detalles del usuario (con filtro opcional de gameType)
    @Query("""
    SELECT p FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
    AND (
        :gameType IS NULL
        OR (:gameType = 'NORMAL' AND p.match.ranked = false AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'RANKED' AND p.match.ranked = true AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'ARAM' AND p.match.map.map = 'ARAM - Howling Abyss')
    )
""")
    List<PlayerMatchDetailEntity> findByUserId(@Param("userId") Long userId,
                                               @Param("gameType") String gameType);


    // Por campeón (con filtro opcional de gameType)
    @Query("""
    SELECT p FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
    AND p.champion.id = :championId
    AND (
        :gameType IS NULL
        OR (:gameType = 'NORMAL' AND p.match.ranked = false AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'RANKED' AND p.match.ranked = true AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'ARAM' AND p.match.map.map = 'ARAM - Howling Abyss')
    )
""")
    List<PlayerMatchDetailEntity> findByUserAndChampion(@Param("userId") Long userId,
                                                        @Param("championId") Long championId,
                                                        @Param("gameType") String gameType);


    // Por rol (sin ARAM, pero con filtro opcional normal/ranked)
    @Query("""
    SELECT p FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
    AND p.role.id = :roleId
    AND (
        :gameType IS NULL
        OR (:gameType = 'NORMAL' AND p.match.ranked = false AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'RANKED' AND p.match.ranked = true AND p.match.map.map = 'Summoners Rift')
    )
""")
    List<PlayerMatchDetailEntity> findByUserAndRole(@Param("userId") Long userId,
                                                    @Param("roleId") Long roleId,
                                                    @Param("gameType") String gameType);


    // Por campeón + rol (sin ARAM, pero con filtro opcional normal/ranked)
    @Query("""
    SELECT p FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
    AND p.champion.id = :championId
    AND p.role.id = :roleId
    AND (
        :gameType IS NULL
        OR (:gameType = 'NORMAL' AND p.match.ranked = false AND p.match.map.map = 'Summoners Rift')
        OR (:gameType = 'RANKED' AND p.match.ranked = true AND p.match.map.map = 'Summoners Rift')
    )
""")
    List<PlayerMatchDetailEntity> findByUserChampionAndRole(@Param("userId") Long userId,
                                                            @Param("championId") Long championId,
                                                            @Param("roleId") Long roleId,
                                                            @Param("gameType") String gameType);


    @Query("""
    SELECT p 
    FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
      AND UPPER(p.match.map.map) = 'ARAM - HOWLING ABYSS'
""")
    List<PlayerMatchDetailEntity> findUserAramMatches(@Param("userId") Long userId);


    @Query("""
    SELECT p
    FROM PlayerMatchDetailEntity p
    WHERE p.user.id = :userId
      AND (
            :gameType IS NULL
         OR (:gameType = 'NORMAL' AND p.match.ranked = false AND UPPER(p.match.map.map) = 'SUMMONERS RIFT')
         OR (:gameType = 'RANKED' AND p.match.ranked = true AND UPPER(p.match.map.map) = 'SUMMONERS RIFT')
      )
      AND (:role IS NULL OR LOWER(p.role.role) = LOWER(:role))
""")
    List<PlayerMatchDetailEntity> findUserNormalOrRankedMatches(
            @Param("userId") Long userId,
            @Param("gameType") String gameType,
            @Param("role") String role
    );






}
