package LoL_Client_Back.services.interfaces.transaction;

import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.transaction.UserLoot;
import org.springframework.stereotype.Service;

@Service
public interface UserLootService {
    UserLoot createUserLoot (UserEntity user);
    UserLootDTO createUserLoot
            (Long idUser, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence);

    UserLootDTO findByUserId(Long idUser);

    UserLootDTO updateUserLoot (Long idLoot, Integer chests, Integer masterChests, Integer keys,  Integer orangeEssence);
    UserLootDTO openChests (Long idUser, Integer chestsToOpen, Integer masterChestsToOpen);

    UserLootDTO unlockOrRefundChampionLoot (Long idLootChampion, boolean unlock);
    UserLootDTO unlockOrRefundSkinLoot (Long idLootSkin, boolean unlock);
    UserLootDTO unlockOrRefundIconLoot (Long idLootIcon, boolean unlock);

    UserLootDTO rerollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3);
    UserLootDTO rerollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3);
    UserLootDTO rerollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3);








}
