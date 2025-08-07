package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.reference.ChampionDifficultyEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import LoL_Client_Back.models.reference.ChampionDifficulty;
import LoL_Client_Back.models.reference.ChampionStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChampionRepository extends JpaRepository<ChampionEntity,Long> {
    Optional<ChampionEntity> findByNameIgnoreCase(String name);
    List<ChampionEntity> findByNameIgnoreCaseContaining(String name);

    List<ChampionEntity> findByDifficulty(ChampionDifficultyEntity championDifficulty);

    List<ChampionEntity> findByRoleOrRole2(RoleEntity role, RoleEntity role2);

    List<ChampionEntity> findByRoleOrRole2AndStyleOrStyle2(RoleEntity role, RoleEntity role2,
                                                           ChampionStyleEntity style, ChampionStyleEntity style2);
    /*
    WHERE (role = ? AND style = ?) OR (role = ? AND style2 = ?)
     */
    List<ChampionEntity> findByRoleAndStyleOrRoleAndStyle2
    (RoleEntity role, ChampionStyleEntity style, RoleEntity roleAgain, ChampionStyleEntity style2);
    List<ChampionEntity> findByStyle (ChampionStyleEntity style);
    List<ChampionEntity> findByStyleOrStyle2 (ChampionStyleEntity style, ChampionStyleEntity style2);
    List<ChampionEntity> findByRole(RoleEntity role);

    List<ChampionEntity> findByReleaseDateAfterOrderByReleaseDateAsc(LocalDate date);
    List<ChampionEntity> findByReleaseDateBeforeOrderByReleaseDateDesc(LocalDate date);

    List<ChampionEntity> findByWinrateGreaterThanEqualOrderByWinrateAsc(Double winrate);
    List<ChampionEntity> findByWinrateLessThanEqualOrderByWinrateDesc(Double winrate);

    List<ChampionEntity> findByPrice_BlueEssenceCostGreaterThanEqualOrderByPrice_BlueEssenceCostAsc(Integer cost);

    List<ChampionEntity> findByPrice_BlueEssenceCostLessThanEqualOrderByPrice_BlueEssenceCostDesc(Integer cost);
    List<ChampionEntity> findByIdNotIn(List <Long> ids);
    List<ChampionEntity> findByRole_id(Long id);
}
