package LoL_Client_Back.repositories.association;

import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserXChampionRepository extends JpaRepository<UserXChampionEntity,Long> {
    List<UserXChampionEntity> findByChampion_Id(Long id);
    List<UserXChampionEntity> findByUser_Id(Long id);
    List<UserXChampionEntity> findByUser_IdNot(Long id);
    Optional<UserXChampionEntity> findByUserAndChampion(UserEntity userEntity, ChampionEntity championEntity);
}
