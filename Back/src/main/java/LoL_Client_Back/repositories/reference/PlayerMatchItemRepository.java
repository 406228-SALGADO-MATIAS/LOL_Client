package LoL_Client_Back.repositories.reference;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.reference.PlayerMatchItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerMatchItemRepository extends JpaRepository<PlayerMatchItemEntity,Long>
{
    @Query("""
    SELECT DISTINCT i.playerMatchDetail.match
    FROM PlayerMatchItemEntity i
    WHERE i.item.id = :itemId
""")
    List<MatchEntity> findMatchesByItemId(@Param("itemId") Long itemId);
}
