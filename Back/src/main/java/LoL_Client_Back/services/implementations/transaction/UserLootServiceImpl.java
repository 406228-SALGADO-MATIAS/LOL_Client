package LoL_Client_Back.services.implementations.transaction;

import LoL_Client_Back.dtos.loot.LootInventoryChampionDTO;
import LoL_Client_Back.dtos.loot.LootInventoryIconDTO;
import LoL_Client_Back.dtos.loot.LootInventorySkinDTO;
import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.transaction.LootInventoryIcons;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.repositories.transaction.UserLootRepository;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collector;

@Service
public class UserLootServiceImpl implements UserLootService {
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    UserLootRepository userLootRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserXSkinRepository userXSkinRepository;
    @Autowired
    UserXChampionRepository userXChampionRepository;
    @Autowired
    UserXIconRepository userXIconRepository;
    @Autowired
    ChampionRepository championRepository;
    @Autowired
    SkinRepository skinRepository;
    @Autowired
    ProfileIconRepository iconRepository;

    @Override
    public UserLoot createUserLoot(UserEntity user) {
        UserLootEntity userLootEntity = new UserLootEntity();
        userLootEntity.setKeys(4);
        userLootEntity.setMasterChests(2);
        userLootEntity.setChests(2);
        userLootEntity.setOrangeEssence(1050);
        userLootEntity.setUser(user);

        return customMapper.map
                (userLootRepository.save(userLootEntity), UserLoot.class);

    }

    @Override
    public UserLootDTO createUserLoot(Long idUser, Integer chests, Integer masterChests, Integer keys,
                                      Integer orangeEssence)
    {
        Optional<UserEntity> optional = userRepository.findById(idUser);
        if (optional.isPresent()) //USER EXISTS?
        {
            Optional<UserLootEntity> optionalUserLoot =
                    userLootRepository.findByUser_Id(idUser);

            if (optionalUserLoot.isPresent()){ // DOES HAVE AN INVENTORY LOOT?
                throw new RuntimeException("The user does already have a loot inventory");
            }
            else
            {
                UserLootEntity userLootEntity = new UserLootEntity();
                userLootEntity.setUser(optional.get());

                if (chests != null) userLootEntity.setChests(chests);
                else userLootEntity.setChests(2);

                if (masterChests != null) userLootEntity.setMasterChests(masterChests);
                else userLootEntity.setMasterChests(2);

                if (keys != null) userLootEntity.setKeys(keys);
                else userLootEntity.setKeys(4);

                if (orangeEssence != null) userLootEntity.setOrangeEssence(orangeEssence);
                else userLootEntity.setOrangeEssence(1000);

                return buildUserLootDTO(userLootRepository.save(userLootEntity));
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
    }

    @Override
    public UserLootDTO findByUserId(Long idUser) {
        Optional<UserEntity> optional = userRepository.findById(idUser);
        if (optional.isPresent())
        {
            Optional<UserLootEntity> optionalUserLoot =
                    userLootRepository.findByUser_Id(idUser);

            if (optionalUserLoot.isPresent())  //THE USER HAS LOOT
            {
                return buildUserLootDTO(optionalUserLoot.get());
            }
            else //USERS DOES NOT HAVE LOOT -> create
            {
                UserLootEntity userLootEntity = new UserLootEntity();
                userLootEntity.setKeys(1);
                userLootEntity.setChests(1);
                userLootEntity.setOrangeEssence(1050);
                userLootEntity.setUser(optional.get());

                return buildUserLootDTO(
                        userLootRepository.save(userLootEntity));
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
    }

    @Override
    public UserLootDTO updateUserLoot(Long idUser, Integer chests, Integer masterChests, Integer keys, Integer orangeEssence) {
        return null;
    }

    @Override
    public UserLootDTO openChests(Long idUser, Integer chestsToOpen, Integer masterChestsToOpen)
    {
        UserLootDTO userLootDTO = findByUserId(idUser); // if fails, throws exception || if not, creates the loot/ brings the loot
        Optional<UserLootEntity> optionalUserLoot = userLootRepository.findById(userLootDTO.getId());

        if (optionalUserLoot.isEmpty()) {
            throw new RuntimeException("The user does not have loot");
        }

        UserLootEntity loot = optionalUserLoot.get();

        // treat nulls as 0
        int normalToOpen = (chestsToOpen != null) ? chestsToOpen : 0;
        int masterToOpen = (masterChestsToOpen != null) ? masterChestsToOpen : 0;
        int totalToOpen = normalToOpen + masterToOpen;

        // check if the user has enough chests
        if (loot.getChests() < normalToOpen) {
            throw new RuntimeException("The user does not have enough normal chests");
        }

        if (loot.getMasterChests() < masterToOpen) {
            throw new RuntimeException("The user does not have enough master chests");
        }

        // Check if the user has enough keys
        if (loot.getKeys() < totalToOpen) {
            throw new RuntimeException("The user does not have enough keys");
        }

        // decrement the chests and keys
        loot.setChests(loot.getChests() - normalToOpen);
        loot.setMasterChests(loot.getMasterChests() - masterToOpen);
        loot.setKeys(loot.getKeys() - totalToOpen);

        // master chests: always skin
        for (int i = 0; i < masterToOpen; i++) {
            Object reward = getRandomReward(true);
            if (reward instanceof SkinEntity skin) {
                LootInventorySkinsEntity skinEntity = buildNewLootSkinEntity(skin, loot);
                loot.addSkin(skinEntity);
            }
        }

        // normal chests: can be skin, icon, or champion
        for (int i = 0; i < normalToOpen; i++) {
            Object reward = getRandomReward(false);
            if (reward instanceof SkinEntity skin) {
                LootInventorySkinsEntity skinEntity = buildNewLootSkinEntity(skin, loot);
                loot.addSkin(skinEntity);
            } else if (reward instanceof ProfileIconEntity icon) {
                LootInventoryIconsEntity iconEntity = buildNewLootIconEntity(icon, loot);
                loot.addIcon(iconEntity);
            } else if (reward instanceof ChampionEntity champion) {
                LootInventoryChampionsEntity champEntity = buildNewLootChampionEntity(champion, loot);
                loot.addChampion(champEntity);
            }
        }

        return buildUserLootDTO(userLootRepository.save(loot));
    }

    @Override
    public UserLootDTO unlockOrRefundChampionLoot(Long idLootChampion, boolean unlock) {
        return null;
    }

    @Override
    public UserLootDTO unlockOrRefundSkinLoot(Long idLootSkin, boolean unlock) {
        return null;
    }

    @Override
    public UserLootDTO unlockOrRefundIconLoot(Long idLootIcon, boolean unlock) {
        return null;
    }

    @Override
    public UserLootDTO rerollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3) {
        return null;
    }

    @Override
    public UserLootDTO rerollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3) {
        return null;
    }

    @Override
    public UserLootDTO rerollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3) {
        return null;
    }

    private UserLootDTO buildUserLootDTO(UserLootEntity userLootEntity) {

        UserLootDTO dto = customMapper.map(userLootEntity, UserLootDTO.class);
        dto.setUserId(userLootEntity.getUser().getId());
        dto.setUserBlueEssence(userLootEntity.getUser().getBlueEssence());

        //INVENTORY LISTS

        //CHAMPIONS
        List<LootInventoryChampionDTO> championsInventory = new ArrayList<>();

        for (LootInventoryChampionsEntity c : userLootEntity.getChampions()) {
            LootInventoryChampionDTO dtoC = customMapper.map(c, LootInventoryChampionDTO.class);
            dtoC.setIdUserLoot(c.getLoot().getId());
            dtoC.setChampionName(c.getChampion().getName());
            dtoC.setImageUrl(c.getChampion().getImage());
            dtoC.setBlueEssenceCost(c.getChampion().getPrice().getEnchantPrice());
            dtoC.setDisenchantRefund(c.getChampion().getPrice().getDisenchantBlueEssence());
            championsInventory.add(dtoC);
        }
        dto.setChampionsInventory(championsInventory);
        //ICONS
        List<LootInventoryIconDTO> iconsInventory = new ArrayList<>();

        for (LootInventoryIconsEntity i : userLootEntity.getIcons()) {
            LootInventoryIconDTO dtoI = customMapper.map(i, LootInventoryIconDTO.class);

            dtoI.setIdUserLoot(i.getLoot().getId());
            dtoI.setIconName(i.getIcon().getIcon());
            dtoI.setImageUrl(i.getIcon().getImage());
            dtoI.setBlueEssenceCost(i.getIcon().getPrice().getBlueEssenceCost());
            dtoI.setDisenchantRefund(i.getIcon().getPrice().getDisenchantBlueEssence());
            iconsInventory.add(dtoI);
        }
        dto.setIconsInventory(iconsInventory);
        //SKINS
        List<LootInventorySkinDTO> skinsInventory = new ArrayList<>();

        for (LootInventorySkinsEntity s : userLootEntity.getSkins()) {
            LootInventorySkinDTO dtoS = customMapper.map(s, LootInventorySkinDTO.class);
            dtoS.setIdUserLoot(s.getLoot().getId());
            dtoS.setSkinName(s.getSkin().getName());
            dtoS.setImageUrl(s.getSkin().getImage());
            dtoS.setOrangeEssenceCost(s.getSkin().getTier().getOrangeEssenceCost());
            dtoS.setDisenchantRefund(s.getSkin().getTier().getDisenchantOrangeEssence());
            skinsInventory.add(dtoS);
        }
        dto.setSkinsInventory(skinsInventory);

        return dto;
    }

    private LootInventoryChampionsEntity buildNewLootChampionEntity(ChampionEntity champion, UserLootEntity lootEntity)
    {
        LootInventoryChampionsEntity entity = new LootInventoryChampionsEntity();
        entity.setChampion(champion);
        entity.setLoot(lootEntity);
        entity.setIsActive(true);
        entity.setAcquisitionDate(LocalDateTime.now());
        return entity;
    }

    private LootInventorySkinsEntity buildNewLootSkinEntity(SkinEntity skin, UserLootEntity lootEntity) {
        LootInventorySkinsEntity entity = new LootInventorySkinsEntity();
        entity.setSkin(skin);
        entity.setLoot(lootEntity);
        entity.setIsActive(true);
        entity.setAcquisitionDate(LocalDateTime.now());
        return entity;
    }

    private LootInventoryIconsEntity buildNewLootIconEntity(ProfileIconEntity icon, UserLootEntity lootEntity) {
        LootInventoryIconsEntity entity = new LootInventoryIconsEntity();
        entity.setIcon(icon);
        entity.setLoot(lootEntity);
        entity.setIsActive(true);
        entity.setAcquisitionDate(LocalDateTime.now());
        return entity;
    }

    public Object getRandomReward(boolean isMasterChest) {
        Random random = new Random();

        if (isMasterChest) {
            // Solo skins de RP >= 1350
            List<SkinEntity> highTierSkins = skinRepository
                    .findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(1820);
            if (highTierSkins.isEmpty()) return null;
            return getRandomElement(highTierSkins, random);
        }

        int roll = random.nextInt(100); // [0,99]

        if (roll < 40) {
            // 40% Champion
            List<ChampionEntity> champions = championRepository.findAll();
            if (champions.isEmpty()) return null;

            return getRandomElement(champions, random);
        } else if (roll < 70) {
            // 30% Skin
            List<SkinEntity> skins = skinRepository.findAll();
            if (skins.isEmpty()) return null;

            return getRandomElement(skins, random);
        } else {
            // 30% Icon
            List<ProfileIconEntity> icons = iconRepository.findAll();
            if (icons.isEmpty()) return null;

            return getRandomElement(icons, random);
        }
    }

    private <T> T getRandomElement(List<T> list, Random random) {
        return list.get(random.nextInt(list.size()));
    }




}

