package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.dtos.champion.ChampionDTO;
import LoL_Client_Back.dtos.enums.ChampionDifficulty;
import LoL_Client_Back.dtos.enums.ChampionRole;
import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.models.domain.Champion;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ChampionService {
    List<ChampionDTO> getAllChampions ();
    List<ChampionDTO> findChampionsByName(String name);
    List<ChampionDTO> findChampionsByDifficulty(ChampionDifficulty difficulty);

    List<ChampionDTO> findChampionsByRole(ChampionRole championRole);
    List<ChampionDTO> findByRoleOrRole2AndStyleOrStyle2(ChampionRole role, ChampionStyle style);
    List<ChampionDTO> findByRoleAndStyleOrStyle2(ChampionRole role, ChampionStyle style);
    List<ChampionDTO> findByMainRole(ChampionRole role);
    List<ChampionDTO> findByMainStyle(ChampionStyle style);
    List<ChampionDTO> findByStyle(ChampionStyle style);
    List<ChampionDTO> findByDate(LocalDate date, String filter);
    List<ChampionDTO> findByWinrate(Double winrate, String filter);
    List<ChampionDTO> findByBlueEssenceCost(Integer price, String filter);

    ChampionDTO getById(Long id);
    ChampionDTO putChampion(Long id,String name, Double winrate, Integer price,
                            ChampionDifficulty difficulty, ChampionRole role, ChampionRole role2,
                            ChampionStyle style, ChampionStyle style2);
    String deleteChampion (Long id);
    Champion createChampion(String name, Double winrate, String imageUrl, Integer price,
                            ChampionDifficulty difficulty, ChampionRole role, ChampionRole role2,
                            ChampionStyle style, ChampionStyle style2);

    List<ChampionDTO> getUserChampions(Long idUser);
    List<ChampionDTO> getUserChampionsNotPossess(Long idUser);
}
