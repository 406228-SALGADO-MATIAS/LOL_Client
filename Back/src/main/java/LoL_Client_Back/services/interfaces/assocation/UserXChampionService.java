package LoL_Client_Back.services.interfaces.assocation;

import LoL_Client_Back.dtos.association.UserXChampionDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.models.association.UserXChampion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserXChampionService {
    UserXChampionDTO findById(Long id);
    List<UserXChampionDTO> getAll();
    List<UserXChampionDTO> findByChampionId(Long id);
    List<UserXChampionDTO> findByUserId(Long id);
    UserXChampionDTO findByUserAndChampion(Long championId, Long userId);
    void deleteById (Long id);
    UserXChampionDTO createChampionBelonging(Long idUser,Long idChampion);
    UserXChampionDTO updateChampionBelongiong(Long idBelonging, Long idUser, Long idChampion, Integer masteryLevel);

}
