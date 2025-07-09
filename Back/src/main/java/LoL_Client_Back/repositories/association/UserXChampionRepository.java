package LoL_Client_Back.repositories.association;

import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserXChampionRepository extends JpaRepository<UserXChampionEntity,Long> {
    List<UserXChampionEntity> findByChampion_Id(Long id);
    List<UserXChampionEntity> findByUser_Id(Long id);
    List<UserXChampionEntity> findByUser_IdNot(Long id);
    Optional<UserXChampionEntity> findByUserAndChampion(UserEntity userEntity, ChampionEntity championEntity);
    @Query("SELECT DISTINCT u.user.id FROM UserXChampionEntity u")
    List<Long> findAllUserIdsWithChampions();

    //@Query("""
    //    SELECT DISTINCT u.user.id
    //    FROM UserXChampionEntity u
    //    WHERE u.user.id IN :userIds
    //      AND (u.champion.role1.id = :roleId OR u.champion.role2.id = :roleId)
    //""")
    //    List<Long> findUserIdsWithChampionsOfRole(@Param("userIds") List<Long> userIds,
    //                                              @Param("roleId") Long roleId);
}
