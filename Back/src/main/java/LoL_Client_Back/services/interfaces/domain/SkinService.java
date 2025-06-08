package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.dtos.skin.SkinDTO;
import LoL_Client_Back.dtos.enums.Champion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SkinService {
    List<SkinDTO> getAllSkins ();
    List<SkinDTO> findSkinsByChampionName(Champion champion);
    List<SkinDTO> findSkinsByRpCost(String filter, Integer rpCost);
    List<SkinDTO> findSkinsByName(String name);
    SkinDTO getSkinById(Long id);
    List<SkinDTO> findSkinsByChampionId(Long id);
    SkinDTO createSkin(String name, Long championId, String imageUrl,Integer rpCost);
    SkinDTO updateSkin(Long skinId,String name, Long championId, String imageUrl,Integer rpCost);
    void deleteSkin(Long id);
    List<SkinDTO> getUserSkins(Long idUser);
    List<SkinDTO> getUserSkinsNotPossess(Long idUser);
    List<SkinDTO> getUserSkinsEnabledPurchase(Long idUser);

}
