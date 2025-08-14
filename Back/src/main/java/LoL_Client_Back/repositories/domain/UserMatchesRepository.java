package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMatchesRepository extends JpaRepository<UserMatchesEntity,Long> {
    Optional<UserMatchesEntity> findByUser(UserEntity userEntity);

    @Query("""
        SELECT u FROM UserMatchesEntity u
        WHERE u.rankedsPlayed > 0
        AND u.user.server = :server
        ORDER BY u.rankedsPlayed DESC
        """)
    List<UserMatchesEntity> findByRankedMatches(@Param("server") ServerRegionEntity server);

    @Query("""
        SELECT u FROM UserMatchesEntity u
        WHERE u.normalGamesPlayed >0
        AND u.user.server = :server
        ORDER BY u.normalGamesPlayed DESC
        """)
    List<UserMatchesEntity> findByNormalMatches(@Param("server") ServerRegionEntity server);

    @Query("""
        SELECT u FROM UserMatchesEntity u
        WHERE u.aramsPlayed > 0
        AND u.user.server = :server
        ORDER BY u.aramsPlayed DESC
        """)
    List<UserMatchesEntity> findByAramMatches(@Param("server") ServerRegionEntity server);
}
