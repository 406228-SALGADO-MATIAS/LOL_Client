package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<MatchEntity,Long> {
    @Query(value = """
        SELECT DISTINCT m.*
        FROM matches m
        JOIN player_match_details pd ON m.id = pd.match_id
        WHERE pd."user" = :userId
        ORDER BY m.date DESC
        LIMIT 10
        """, nativeQuery = true)
    List<MatchEntity> findTop10MatchesByUserId(@Param("userId") Long userId);

}
