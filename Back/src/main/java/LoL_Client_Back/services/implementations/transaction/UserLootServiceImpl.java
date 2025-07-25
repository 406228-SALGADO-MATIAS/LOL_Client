package LoL_Client_Back.services.implementations.transaction;

import LoL_Client_Back.dtos.loot.LootInventoryChampionDTO;
import LoL_Client_Back.dtos.loot.LootInventoryIconDTO;
import LoL_Client_Back.dtos.loot.LootInventorySkinDTO;
import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.association.UserXIcon;
import LoL_Client_Back.models.transaction.LootInventoryIcons;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.repositories.transaction.LootInventoryChampionsRepository;
import LoL_Client_Back.repositories.transaction.LootInventoryIconsRepository;
import LoL_Client_Back.repositories.transaction.LootInventorySkinsRepository;
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
    @Autowired
    LootInventoryChampionsRepository lootInventoryChampionsRepository;
    @Autowired
    LootInventorySkinsRepository lootInventorySkinsRepository;
    @Autowired
    LootInventoryIconsRepository lootInventoryIconsRepository;

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
                                      Integer orangeEssence, boolean showInactives)
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

                return buildUserLootDTO(userLootRepository.save(userLootEntity),showInactives);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
    }

    @Override
    public UserLootDTO findByUserId(Long idUser, boolean showInactives) {
        Optional<UserEntity> optional = userRepository.findById(idUser);
        if (optional.isPresent())
        {
            Optional<UserLootEntity> optionalUserLoot =
                    userLootRepository.findByUser_Id(idUser);

            if (optionalUserLoot.isPresent())  //THE USER HAS LOOT
            {
                return buildUserLootDTO(optionalUserLoot.get(),showInactives);
            }
            else //USERS DOES NOT HAVE LOOT -> create
            {
                UserLootEntity userLootEntity = new UserLootEntity();
                userLootEntity.setUser(optional.get());

                return buildUserLootDTO(
                        userLootRepository.save(userLootEntity),showInactives);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
    }

    @Override
    public UserLootDTO updateUserLoot(Long idUser, Integer chests, Integer masterChests, Integer keys, Integer orangeEssence, boolean showInactives)
    {
        Optional<UserEntity> optional = userRepository.findById(idUser);
        if (optional.isPresent())
        {
            Optional<UserLootEntity> optionalUserLoot =
                    userLootRepository.findByUser_Id(idUser);

            UserLootEntity userLootEntity = new UserLootEntity(); //THE NEW LOOT IF HE DOES NOT HAVE LOOT

            if (optionalUserLoot.isPresent())  //THE USER HAS LOOT
            {
                userLootEntity = optionalUserLoot.get();
            }
            else userLootEntity.setUser(optional.get());

            if (chests != null) userLootEntity.setChests(chests);

            if (masterChests != null) userLootEntity.setMasterChests(masterChests);

            if (keys != null) userLootEntity.setKeys(keys);

            if (orangeEssence != null) userLootEntity.setOrangeEssence(orangeEssence);

            return buildUserLootDTO(userLootRepository.save(userLootEntity),showInactives);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user with id "+idUser);
    }

    @Override
    public UserLootDTO openChests(Long idUser, Integer chestsToOpen, Integer masterChestsToOpen, boolean showInactives)
    {
        UserLootDTO userLootDTO = findByUserId(idUser,true); // if fails, throws exception || if not, creates the loot/ brings the loot
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

        return buildUserLootDTO(userLootRepository.save(loot),showInactives);
    }

    @Override
    public UserLootDTO unlockOrRefundChampionLoot(Long idLootChampion, boolean unlock, boolean showInactives)
    {
        Optional<LootInventoryChampionsEntity> optional =
                lootInventoryChampionsRepository.findById(idLootChampion);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion loot with id "+idLootChampion);

        LootInventoryChampionsEntity inventory = optional.get();

        if (!inventory.getIsActive()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This userLoot is inactive and cant be unlocked or removed");
        }

        UserLootEntity userLoot = inventory.getLoot();
        UserEntity userEntity = userLoot.getUser();

        Optional<UserXChampionEntity> champion = //Look if the user has the champion
                userXChampionRepository.findByUserAndChampion(userEntity,inventory.getChampion());

        int enchantPrice = inventory.getChampion().getPrice().getEnchantPrice();
        int userBlueEssence = userEntity.getBlueEssence();

        boolean owned = champion.isPresent();

        if (unlock) //WANTS TO UNLOCK
        {
            if (!owned) //IF DOES NOT HAVE THE CHAMPION
            {
                if (userBlueEssence >= enchantPrice) {
                    inventory.setIsActive(false);
                    inventory.setRemovalDate(LocalDateTime.now());

                    //update lootInventoryChampion
                    lootInventoryChampionsRepository.save(inventory);

                    userBlueEssence -= enchantPrice; //update user blue essence

                    userEntity.setBlueEssence(userBlueEssence);
                    userRepository.save(userEntity); // update user

                    // add new champion belonging
                    UserXChampionEntity userXChampion = new UserXChampionEntity();
                    userXChampion.setChampion(inventory.getChampion());
                    userXChampion.setUser(userEntity);
                    userXChampion.setMasteryLevel(0);
                    userXChampion.setAdquisitionDate(LocalDateTime.now());

                    userXChampionRepository.save(userXChampion);

                    return buildUserLootDTO(userLoot,showInactives);
                }
                else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "The user does not have enough blue essence : "+userBlueEssence + " < "+enchantPrice);
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user already has the champion " +inventory.getChampion().getName());
        }
        else //DISENCHANT / REMOVE
        {
            inventory.setIsActive(false);
            inventory.setRemovalDate(LocalDateTime.now());
            lootInventoryChampionsRepository.save(inventory);

            userBlueEssence += inventory.getChampion().getPrice().getDisenchantBlueEssence();

            userEntity.setBlueEssence(userBlueEssence);
            userRepository.save(userEntity); // update user

            return buildUserLootDTO(userLoot,showInactives);
        }
    }

    @Override
    public UserLootDTO unlockOrRefundSkinLoot(Long idLootSkin, boolean unlock, boolean showInactives)
    {
        Optional<LootInventorySkinsEntity> optional =
                lootInventorySkinsRepository.findById(idLootSkin);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find skin loot with id "+idLootSkin);

        LootInventorySkinsEntity inventory = optional.get();

        if (!inventory.getIsActive()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "This userLoot is inactive and cant be unlocked or removed");
        }

        UserLootEntity userLoot = inventory.getLoot();
        UserEntity userEntity = userLoot.getUser();

        ChampionEntity championOfSkin = inventory.getSkin().getChampion(); // The champion of the skin

        Optional<UserXChampionEntity> optionalUserXChampion = //Look if the user has the champion
                userXChampionRepository.findByUserAndChampion(userEntity,championOfSkin);

        Optional<UserXSkinEntity> optionalUserXSkin = //Look if the user has the skin
                userXSkinRepository.findByUserAndSkin(userEntity,inventory.getSkin());

        int enchantPrice = inventory.getSkin().getTier().getOrangeEssenceCost();
        int userOrangeEssence = userLoot.getOrangeEssence();

        boolean owned = optionalUserXSkin.isPresent();
        boolean hasTheChampion = optionalUserXChampion.isPresent();

        if (unlock) //WANTS TO UNLOCK
        {
            if (!owned) //IF DOES NOT HAVE THE SKIN
            {
                if (hasTheChampion)// HAS THE CHAMPION OF THE SKIN
                {
                    if (userOrangeEssence >= enchantPrice)
                    {
                        inventory.setIsActive(false);
                        inventory.setRemovalDate(LocalDateTime.now());
                        lootInventorySkinsRepository.save(inventory); //update lootInventorySkin

                        userOrangeEssence -= enchantPrice;
                        userLoot.setOrangeEssence(userOrangeEssence);
                        userLootRepository.save(userLoot); //update user orange essence

                        // add new skin belonging
                        UserXSkinEntity userXSkin = new UserXSkinEntity();
                        userXSkin.setSkin(inventory.getSkin());
                        userXSkin.setUser(userEntity);
                        userXSkin.setAdquisitionDate(LocalDateTime.now());

                        userXSkinRepository.save(userXSkin);

                        return buildUserLootDTO(userLoot,showInactives);
                    }
                    else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "The user does not have enough orange essence : "+userOrangeEssence + " < "+enchantPrice);
                }
                else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "The user does not have the champion "
                                +inventory.getSkin().getChampion().getName() +
                        " to adquire the skin "+ inventory.getSkin().getName());
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user already has the skin " +inventory.getSkin().getName());
        }
        else //DISENCHANT / REMOVE
        {
            inventory.setIsActive(false);
            inventory.setRemovalDate(LocalDateTime.now());
            lootInventorySkinsRepository.save(inventory); //update lootInventorySkin

            userOrangeEssence += inventory.getSkin().getTier().getDisenchantOrangeEssence();
            userLoot.setOrangeEssence(userOrangeEssence);
            userLootRepository.save(userLoot); //update user orange essence

            return buildUserLootDTO(userLoot,showInactives);
        }
    }

    @Override
    public UserLootDTO unlockOrRefundIconLoot(Long idLootIcon, boolean unlock, boolean showInactives) {
        Optional<LootInventoryIconsEntity> optional =
                lootInventoryIconsRepository.findById(idLootIcon);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find icon loot with id "+idLootIcon);

        LootInventoryIconsEntity inventory = optional.get();

        if (!inventory.getIsActive()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This userLoot is inactive and cant be unlocked or removed");
        }

        UserLootEntity userLoot = inventory.getLoot();
        UserEntity userEntity = userLoot.getUser();

        Optional<UserXIconEntity> icon = //Look if the user has the icon
                userXIconRepository.findByUserAndIcon(userEntity,inventory.getIcon());

        int enchantPrice = inventory.getIcon().getPrice().getBlueEssenceCost();//enchant price is too cheap
        int userBlueEssence = userEntity.getBlueEssence();

        boolean owned = icon.isPresent();

        if (unlock) //WANTS TO UNLOCK
        {
            if (!owned) //IF DOES NOT HAVE THE ICON
            {
                if (userBlueEssence >= enchantPrice) {
                    inventory.setIsActive(false);
                    inventory.setRemovalDate(LocalDateTime.now());

                    //update lootInventoryIcon
                    lootInventoryIconsRepository.save(inventory);

                    userBlueEssence -= enchantPrice; //update user blue essence

                    userEntity.setBlueEssence(userBlueEssence);
                    userRepository.save(userEntity); // update user

                    // add new icon belonging
                    UserXIconEntity userXIcon = new UserXIconEntity();
                    userXIcon.setIcon(inventory.getIcon());
                    userXIcon.setUser(userEntity);
                    userXIcon.setAdquisitionDate(LocalDateTime.now());

                    userXIconRepository.save(userXIcon);

                    return buildUserLootDTO(userLoot,showInactives);
                }
                else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "The user does not have enough blue essence : "+userBlueEssence + " < "+enchantPrice);
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user already has the icon " +inventory.getIcon().getIcon());
        }
        else //DISENCHANT / REMOVE
        {
            inventory.setIsActive(false);
            inventory.setRemovalDate(LocalDateTime.now());
            lootInventoryIconsRepository.save(inventory);

            userBlueEssence += inventory.getIcon().getPrice().getEnchantPrice(); //disenchant price is too cheap

            userEntity.setBlueEssence(userBlueEssence);
            userRepository.save(userEntity); // update user

            return buildUserLootDTO(userLoot,showInactives);
        }
    }

    @Override
    public UserLootDTO rerollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3, boolean showInactives) {
        return null;
    }

    @Override
    public UserLootDTO rerollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3, boolean showInactives) {
        return null;
    }

    @Override
    public UserLootDTO rerollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3, boolean showInactives) {
        return null;
    }

    private UserLootDTO buildUserLootDTO(UserLootEntity userLootEntity, boolean showInactives) {

        UserLootDTO dto = customMapper.map(userLootEntity, UserLootDTO.class);
        dto.setUserId(userLootEntity.getUser().getId());
        dto.setUserBlueEssence(userLootEntity.getUser().getBlueEssence());

        //INVENTORY LISTS

        //CHAMPIONS
        List<LootInventoryChampionDTO> championsInventory = new ArrayList<>();

        for (LootInventoryChampionsEntity c : userLootEntity.getChampions()) {

            if (!showInactives && !c.getIsActive()) continue;

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

            if (!showInactives && !i.getIsActive()) continue;

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

            if (!showInactives && !s.getIsActive()) continue;

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

