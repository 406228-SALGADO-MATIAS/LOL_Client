package LoL_Client_Back.services.interfaces.transaction;

import LoL_Client_Back.dtos.loot.NewItemDTO;
import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.models.transaction.UserLoot;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserLootService {
    UserLootDTO findById (Long id, boolean showInactives);
    List<UserLootDTO> findAll(boolean showInactives);

    UserLoot createUserLoot (UserEntity user);

    UserLootDTO findByLootInventoryId (Long idLoot, String userLootType, boolean showInactives);

    UserLootDTO createUserLoot
            (Long idUser, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence, boolean showInactives);

    UserLootDTO findByUserId(Long idUser, boolean showInactives);

    UserLootDTO updateUserLoot (Long idLoot, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence, boolean showInactives);
    UserLootDTO openChests (Long idUser, Integer chestsToOpen, Integer masterChestsToOpen, boolean showInactives);
    NewItemDTO openNormalChest(Long idUser);
    NewItemDTO openMasterChest(Long idUser);


    NewItemDTO unlockOrRefundChampionLoot (Long idLootChampion, boolean unlock);
    NewItemDTO unlockOrRefundSkinLoot (Long idLootSkin, boolean unlock);
    NewItemDTO unlockOrRefundIconLoot (Long idLootIcon, boolean unlock);

    NewItemDTO reRollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3);
    NewItemDTO reRollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3);
    NewItemDTO reRollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3);

    UserLootDTO disenchantAll (Long idUser,String lootType, boolean showInactives);
    UserLootDTO disenchantOwnedItems (Long idUser, boolean showInactives);

    void delete(Long userLootId);

    void deleteLootInventory (Long idLoot, String typeLoot);
}
