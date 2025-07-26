package LoL_Client_Back.services.interfaces.transaction;

import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.models.transaction.UserLoot;
import org.springframework.stereotype.Service;

@Service
public interface UserLootService {
    UserLoot createUserLoot (UserEntity user);

    UserLootDTO findByLootInventoryId (Long idLoot, String userLootType, boolean showInactives);

    UserLootDTO createUserLoot
            (Long idUser, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence, boolean showInactives);

    UserLootDTO findByUserId(Long idUser, boolean showInactives);

    UserLootDTO updateUserLoot (Long idLoot, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence, boolean showInactives);
    UserLootDTO openChests (Long idUser, Integer chestsToOpen, Integer masterChestsToOpen, boolean showInactives);

    UserLootDTO unlockOrRefundChampionLoot (Long idLootChampion, boolean unlock, boolean showInactives);
    UserLootDTO unlockOrRefundSkinLoot (Long idLootSkin, boolean unlock, boolean showInactives);
    UserLootDTO unlockOrRefundIconLoot (Long idLootIcon, boolean unlock, boolean showInactives);

    UserLootDTO reRollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3, boolean showInactives);
    UserLootDTO reRollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3, boolean showInactives);
    UserLootDTO reRollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3, boolean showInactives);

    UserLootDTO disenchantAll (Long idUser,String lootType, boolean showInactives);

}
