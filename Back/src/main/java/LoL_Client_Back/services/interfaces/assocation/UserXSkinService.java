package LoL_Client_Back.services.interfaces.assocation;

import LoL_Client_Back.dtos.association.UserXSkinDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserXSkinService {
    UserXSkinDTO findById(Long id);
    List<UserXSkinDTO> getAll();
    List<UserXSkinDTO> findBySkinId(Long id);
    List<UserXSkinDTO> findByUserId(Long id);
    UserXSkinDTO findByUserAndSkin(Long championId, Long userId);
    void deleteById (Long id);
    UserXSkinDTO createSkinBelonging(Long idUser, Long idChampion);
    UserXSkinDTO updateSkinBelongiong(Long idBelonging, Long idUser, Long idChampion);
    String giveSkinsToUsersWithout();
}
