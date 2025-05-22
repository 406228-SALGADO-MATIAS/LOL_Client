package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.SkinEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkinRepository extends JpaRepository<SkinEntity,Long> {
    List<SkinEntity> findByChampion_Name(String name);
    List<SkinEntity> findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(Integer rpCost);
    List<SkinEntity> findByTier_RpCostLessThanEqualOrderByTier_RpCostDesc(Integer rpCost);
    List<SkinEntity> findByNameIgnoreCaseContaining(String name);
    List<SkinEntity> findByChampion_Id(Long championId);
}
