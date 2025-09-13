package LoL_Client_Back.services.implementations.transaction;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.loot.*;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.*;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.reference.TeamEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
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

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    DTOBuilder dtoBuilder;

    @Override
    public UserLootDTO findById(Long id, boolean showInactives) {
       Optional <UserLootEntity> optional = userLootRepository.findById(id);
       if (optional.isEmpty())
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user loot with id "+id);
       return dtoBuilder.buildUserLootDTO(optional.get(),showInactives);
    }

    @Override
    public List<UserLootDTO> findAll(boolean showInactives) {
        List<UserLootEntity> list = userLootRepository.findAll();
        if (list.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find any user loots");

        List<UserLootDTO> dtoList = new ArrayList<>();
        for (UserLootEntity entity : list)
        {
            dtoList.add(dtoBuilder.buildUserLootDTO(entity,showInactives));
        }
        return dtoList;
    }

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
    public UserLootDTO findByLootInventoryId(Long idLoot,String userLootType, boolean showInactives) {

        Optional<UserLootEntity> optional;
        switch (userLootType.toUpperCase()) {
            case "SKINS":

                optional = lootInventorySkinsRepository.
                        findUserLootByLootInventorySkinId(idLoot);

                if (optional.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user loot with loot "+userLootType+" id : "+idLoot);

                return dtoBuilder.buildUserLootDTO(optional.get(),showInactives);
            case "CHAMPIONS":
                optional = lootInventoryChampionsRepository.
                        findUserLootByLootInventoryChampionId(idLoot);

                if (optional.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user loot with loot "+userLootType+" id : "+idLoot);

                return dtoBuilder.buildUserLootDTO(optional.get(), showInactives);
            case "ICONS":
                optional = lootInventoryIconsRepository.
                        findUserLootByLootInventoryIconId(idLoot);

                if (optional.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find user loot with loot "+userLootType+" id : "+idLoot);

                return dtoBuilder.buildUserLootDTO(optional.get(), showInactives);
            default:
                throw new IllegalArgumentException("Not supported loot type " + userLootType);
        }
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

                return dtoBuilder.buildUserLootDTO(userLootRepository.save(userLootEntity),showInactives);
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
                return dtoBuilder.buildUserLootDTO(optionalUserLoot.get(),showInactives);
            }
            else //USERS DOES NOT HAVE LOOT -> create
            {
                UserLootEntity userLootEntity = new UserLootEntity();
                userLootEntity.setUser(optional.get());

                return dtoBuilder.buildUserLootDTO(
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

            return dtoBuilder.buildUserLootDTO(userLootRepository.save(userLootEntity),showInactives);
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
                loot.addLootSkin(skinEntity);
            }
        }

        // normal chests: can be skin, icon, or champion
        for (int i = 0; i < normalToOpen; i++) {
            Object reward = getRandomReward(false);
            if (reward instanceof SkinEntity skin) {
                LootInventorySkinsEntity skinEntity = buildNewLootSkinEntity(skin, loot);
                loot.addLootSkin(skinEntity);
            } else if (reward instanceof ProfileIconEntity icon) {
                LootInventoryIconsEntity iconEntity = buildNewLootIconEntity(icon, loot);
                loot.addLootIcon(iconEntity);
            } else if (reward instanceof ChampionEntity champion) {
                LootInventoryChampionsEntity champEntity = buildNewLootChampionEntity(champion, loot);
                loot.addLootChampion(champEntity);
            }
        }
        return dtoBuilder.buildUserLootDTO(userLootRepository.save(loot),showInactives);
    }

    @Override
    public NewItemDTO openNormalChest(Long idUser) {
        UserLootDTO userLootDTO = findByUserId(idUser, true);
        UserLootEntity loot = userLootRepository.findById(userLootDTO.getId())
                .orElseThrow(() -> new RuntimeException("The user does not have loot"));

        if (loot.getChests() < 1) {
            throw new RuntimeException("The user does not have enough normal chests");
        }
        if (loot.getKeys() < 1) {
            throw new RuntimeException("The user does not have enough keys");
        }

        loot.setChests(loot.getChests() - 1);
        loot.setKeys(loot.getKeys() - 1);

        Object lootEntity;
        Object reward = getRandomReward(false);

        if (reward instanceof SkinEntity skin) {
            LootInventorySkinsEntity skinEntity = buildNewLootSkinEntity(skin, loot);
            loot.addLootSkin(skinEntity);
            lootEntity = skinEntity;
        } else if (reward instanceof ProfileIconEntity icon) {
            LootInventoryIconsEntity iconEntity = buildNewLootIconEntity(icon, loot);
            loot.addLootIcon(iconEntity);
            lootEntity = iconEntity;
        } else if (reward instanceof ChampionEntity champion) {
            LootInventoryChampionsEntity champEntity = buildNewLootChampionEntity(champion, loot);
            loot.addLootChampion(champEntity);
            lootEntity = champEntity;
        } else {
            throw new RuntimeException("Invalid reward type");
        }

        userLootRepository.save(loot);
        return dtoBuilder.buildNewItemDTO(lootEntity);
    }

    @Override
    public NewItemDTO openMasterChest(Long idUser) {
        UserLootDTO userLootDTO = findByUserId(idUser, true);
        UserLootEntity loot = userLootRepository.findById(userLootDTO.getId())
                .orElseThrow(() -> new RuntimeException("The user does not have loot"));

        if (loot.getMasterChests() < 1) {
            throw new RuntimeException("The user does not have enough master chests");
        }
        if (loot.getKeys() < 1) {
            throw new RuntimeException("The user does not have enough keys");
        }

        loot.setMasterChests(loot.getMasterChests() - 1);
        loot.setKeys(loot.getKeys() - 1);

        Object reward = getRandomReward(true);
        if (!(reward instanceof SkinEntity skin)) {
            throw new RuntimeException("Master chest must always give a skin");
        }

        LootInventorySkinsEntity skinEntity = buildNewLootSkinEntity(skin, loot);
        loot.addLootSkin(skinEntity);

        userLootRepository.save(loot);
        return dtoBuilder.buildNewItemDTO(skinEntity);
    }




    @Override
    public NewItemDTO unlockOrRefundChampionLoot(Long idLootChampion, boolean unlock)
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

                    return dtoBuilder.buildNewItemDTO(inventory);
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

            return dtoBuilder.buildNewItemDTO(inventory);
        }
    }

    @Override
    public NewItemDTO unlockOrRefundSkinLoot(Long idLootSkin, boolean unlock)
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

                        return dtoBuilder.buildNewItemDTO(inventory);
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

            return dtoBuilder.buildNewItemDTO(inventory);
        }
    }

    @Override
    public NewItemDTO unlockOrRefundIconLoot(Long idLootIcon, boolean unlock) {
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

                    return dtoBuilder.buildNewItemDTO(inventory);
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

            return dtoBuilder.buildNewItemDTO(inventory);
        }
    }

    @Override
    public NewItemDTO reRollChampionsLoot(Long idLootChampion1, Long idLootChampion2, Long idLootChampion3)
    {
        List<Long> idsLootChampion =
                List.of(idLootChampion1, idLootChampion2, idLootChampion3);

        @SuppressWarnings("unchecked")
        List<LootInventoryChampionsEntity> listLoot = (List<LootInventoryChampionsEntity>) (List<?>)
                validateLootInventory(idsLootChampion, true, false, false);

        UserLootEntity userLoot = listLoot.get(0).getLoot();
        UserEntity user = userLoot.getUser();

        for (LootInventoryChampionsEntity c : listLoot) { //DEACTIVATE THE LOOTS THAT WERE REROLLED
            c.setIsActive(false);
            c.setRemovalDate(LocalDateTime.now());
        }
        lootInventoryChampionsRepository.saveAll(listLoot); //UPDATE THEM

        ChampionEntity championObtained = reRollDropChampion(user); //OBTAIN CHAMPION THAT THE USER DOES NOT HAVE

        //ASK IF THE PLAYER ALREADY HAS THE CHAMPION (only if he has all the champions)
        Optional<UserXChampionEntity> optional =
                userXChampionRepository.findByUserAndChampion(user,championObtained);

        boolean alreadyOwned = optional.isPresent();
        //ADD NEW LOOT
        LootInventoryChampionsEntity newLoot = new LootInventoryChampionsEntity();
        newLoot.setAcquisitionDate(LocalDateTime.now());
        newLoot.setLoot(userLoot);
        newLoot.setChampion(championObtained);
        newLoot.setIsActive(true);

        if (!alreadyOwned) { //YOU DID NOT HAVE THE CHAMPION
            newLoot.setIsActive(false);
            newLoot.setRemovalDate(LocalDateTime.now());
            //SAVE NEW USER BELONGING
            UserXChampionEntity userXChampion = new UserXChampionEntity();
            userXChampion.setAdquisitionDate(LocalDateTime.now());
            userXChampion.setMasteryLevel(0);
            userXChampion.setUser(user);
            userXChampion.setChampion(championObtained);
            userXChampionRepository.save(userXChampion);
        }

        userLoot.addLootChampion(newLoot);
        userLootRepository.save(userLoot);
        return dtoBuilder.buildNewItemDTO(newLoot);
    }

    @Override
    public NewItemDTO reRollSkinsLoot(Long idLootSkin1, Long idLootSkin2, Long idLootSkin3)
    {
        List<Long> idsLootSkin = List.of(idLootSkin1, idLootSkin2, idLootSkin3);

        @SuppressWarnings("unchecked")
        List<LootInventorySkinsEntity> listLoot = (List<LootInventorySkinsEntity>) (List<?>)
                validateLootInventory(idsLootSkin, false, true, false);

        UserLootEntity userLoot = listLoot.get(0).getLoot();
        UserEntity user = userLoot.getUser();

        for (LootInventorySkinsEntity s : listLoot) { // DEACTIVATE THE LOOTS THAT WERE REROLLED
            s.setIsActive(false);
            s.setRemovalDate(LocalDateTime.now());
        }
        lootInventorySkinsRepository.saveAll(listLoot); // UPDATE THEM

        SkinEntity skinObtained = reRollDropSkin(user); // OBTAIN SKIN THAT THE USER DOES NOT HAVE

        Optional<UserXSkinEntity> optional =
                userXSkinRepository.findByUserAndSkin(user, skinObtained);

        boolean alreadyOwned = optional.isPresent();

        // ADD NEW LOOT
        LootInventorySkinsEntity newLoot = new LootInventorySkinsEntity();
        newLoot.setAcquisitionDate(LocalDateTime.now());
        newLoot.setLoot(userLoot);
        newLoot.setSkin(skinObtained);
        newLoot.setIsActive(true);

        if (!alreadyOwned) { // YOU DID NOT HAVE THE SKIN
            newLoot.setIsActive(false);
            newLoot.setRemovalDate(LocalDateTime.now());

            // SAVE NEW USER BELONGING
            UserXSkinEntity userXSkin = new UserXSkinEntity();
            userXSkin.setAdquisitionDate(LocalDateTime.now());
            userXSkin.setUser(user);
            userXSkin.setSkin(skinObtained);
            userXSkinRepository.save(userXSkin);
        }

        userLoot.addLootSkin(newLoot);
        userLootRepository.save(userLoot);

        return dtoBuilder.buildNewItemDTO(newLoot);
    }

    @Override
    public NewItemDTO reRollIconsLoot(Long idLootIcon1, Long idLootIcon2, Long idLootIcon3)
    {
        List<Long> idsLootIcon = List.of(idLootIcon1, idLootIcon2, idLootIcon3);

        @SuppressWarnings("unchecked")
        List<LootInventoryIconsEntity> listLoot = (List<LootInventoryIconsEntity>) (List<?>)
                validateLootInventory(idsLootIcon, false, false, true);

        UserLootEntity userLoot = listLoot.get(0).getLoot();
        UserEntity user = userLoot.getUser();

        for (LootInventoryIconsEntity i : listLoot) { // DEACTIVATE THE LOOTS THAT WERE REROLLED
            i.setIsActive(false);
            i.setRemovalDate(LocalDateTime.now());
        }
        lootInventoryIconsRepository.saveAll(listLoot); // UPDATE THEM

        ProfileIconEntity iconObtained = reRollDropIcon(user); // OBTAIN ICON THAT THE USER DOES NOT HAVE

        Optional<UserXIconEntity> optional =
                userXIconRepository.findByUserAndIcon(user, iconObtained);

        boolean alreadyOwned = optional.isPresent();

        // ADD NEW LOOT
        LootInventoryIconsEntity newLoot = new LootInventoryIconsEntity();
        newLoot.setAcquisitionDate(LocalDateTime.now());
        newLoot.setLoot(userLoot);
        newLoot.setIcon(iconObtained);
        newLoot.setIsActive(true);

        if (!alreadyOwned) { // YOU DID NOT HAVE THE ICON
            newLoot.setIsActive(false);
            newLoot.setRemovalDate(LocalDateTime.now());

            // SAVE NEW USER BELONGING
            UserXIconEntity userXIcon = new UserXIconEntity();
            userXIcon.setAdquisitionDate(LocalDateTime.now());
            userXIcon.setUser(user);
            userXIcon.setIcon(iconObtained);
            userXIconRepository.save(userXIcon);
        }

        userLoot.addLootIcon(newLoot);
        userLootRepository.save(userLoot);

        return dtoBuilder.buildNewItemDTO(newLoot);
    }

    @Override
    public UserLootDTO disenchantAll(Long idUser,String lootType, boolean showInactives)
    {
        Optional<UserEntity> optionalUser = userRepository.findById(idUser);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);

        Optional<UserLootEntity> optionalUserLoot = userLootRepository.findByUser_Id(idUser);
        if (optionalUserLoot.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user loot with id user " + idUser);

        UserLootEntity userLoot = optionalUserLoot.get();

        switch (lootType.toUpperCase()) {
            case "SKINS":
                List<LootInventorySkinsEntity> listLootSkins =
                        lootInventorySkinsRepository.findByLootAndIsActiveTrue(userLoot);
                if (listLootSkins.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "This user loot has no skins active in it. Id user: " + idUser);
                for (LootInventorySkinsEntity lootSkin : listLootSkins) {
                    unlockOrRefundSkinLoot(lootSkin.getId(), false);
                }
                break;

            case "CHAMPIONS":
                List<LootInventoryChampionsEntity> listLootChampions =
                        lootInventoryChampionsRepository.findByLootAndIsActiveTrue(userLoot);
                if (listLootChampions.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "This user loot has no champions active in it. Id user: " + idUser);
                for (LootInventoryChampionsEntity lootChampion : listLootChampions) {
                    unlockOrRefundChampionLoot(lootChampion.getId(), false);
                }
                break;

            case "ICONS":
                List<LootInventoryIconsEntity> listLootIcons =
                        lootInventoryIconsRepository.findByLootAndIsActiveTrue(userLoot);
                if (listLootIcons.isEmpty())
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "This user loot has no icons active in it. Id user: " + idUser);
                for (LootInventoryIconsEntity lootIcon : listLootIcons) {
                    unlockOrRefundIconLoot(lootIcon.getId(), false);
                }
                break;

            default:
                throw new IllegalArgumentException("Not supported loot type: " + lootType);
        }

        return dtoBuilder.buildUserLootDTO(userLoot, showInactives);
    }

    @Override
    public UserLootDTO disenchantOwnedItems(Long idUser, boolean showInactives) {
        Optional<UserEntity> optionalUser = userRepository.findById(idUser);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
        }
        UserEntity user = optionalUser.get();

        Optional<UserLootEntity> optionalLoot = userLootRepository.findByUser_Id(idUser);
        if (optionalLoot.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find loot for user with id " + idUser);
        }
        UserLootEntity userLoot = optionalLoot.get();

        disenchantDuplicateLoot(userLoot);

        // Listas para agregar los loot ya adquiridos
        List<LootInventorySkinsEntity> acquiredSkins = new ArrayList<>();
        List<LootInventoryChampionsEntity> acquiredChampions = new ArrayList<>();
        List<LootInventoryIconsEntity> acquiredIcons = new ArrayList<>();

        // --- Champions ---
        List<LootInventoryChampionsEntity> lootChampions =
                lootInventoryChampionsRepository.findByLootAndIsActiveTrue(userLoot);
        for (LootInventoryChampionsEntity lootChampion : lootChampions) {
            Optional<UserXChampionEntity> ownedChampion =
                    userXChampionRepository.findByUserAndChampion(user, lootChampion.getChampion());
            if (ownedChampion.isPresent()) {
                acquiredChampions.add(lootChampion);
            }
        }

        // --- Skins ---
        List<LootInventorySkinsEntity> lootSkins =
                lootInventorySkinsRepository.findByLootAndIsActiveTrue(userLoot);
        for (LootInventorySkinsEntity lootSkin : lootSkins) {
            Optional<UserXSkinEntity> ownedSkin =
                    userXSkinRepository.findByUserAndSkin(user, lootSkin.getSkin());
            if (ownedSkin.isPresent()) {
                acquiredSkins.add(lootSkin);
            }
        }

        // --- Icons ---
        List<LootInventoryIconsEntity> lootIcons =
                lootInventoryIconsRepository.findByLootAndIsActiveTrue(userLoot);
        for (LootInventoryIconsEntity lootIcon : lootIcons) {
            Optional<UserXIconEntity> ownedIcon =
                    userXIconRepository.findByUserAndIcon(user, lootIcon.getIcon());
            if (ownedIcon.isPresent()) {
                acquiredIcons.add(lootIcon);
            }
        }

        // --- Disenchant champions adquiridos ---
        for (LootInventoryChampionsEntity lootChampion : acquiredChampions) {
            unlockOrRefundChampionLoot(lootChampion.getId(), false);
        }

        // --- Disenchant skins adquiridos ---
        for (LootInventorySkinsEntity lootSkin : acquiredSkins) {
            unlockOrRefundSkinLoot(lootSkin.getId(), false);
        }

        // --- Disenchant icons adquiridos ---
        for (LootInventoryIconsEntity lootIcon : acquiredIcons) {
            unlockOrRefundIconLoot(lootIcon.getId(), false);
        }

        Optional<UserLootEntity> optionalLoot2 = userLootRepository.findByUser_Id(idUser);
        if (optionalLoot2.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find loot for user with id " + idUser);
        }
        return dtoBuilder.buildUserLootDTO(optionalLoot2.get(),false);
    }

    private void disenchantDuplicateLoot(UserLootEntity userLoot) {
        // --- Champions duplicados ---
        List<LootInventoryChampionsEntity> lootChampions =
                lootInventoryChampionsRepository.findByLootAndIsActiveTrue(userLoot);
        Map<ChampionEntity, List<LootInventoryChampionsEntity>> groupedChampions = lootChampions.stream()
                .collect(Collectors.groupingBy(LootInventoryChampionsEntity::getChampion));
        for (List<LootInventoryChampionsEntity> duplicates : groupedChampions.values()) {
            if (duplicates.size() > 1) {
                // eliminar todos excepto el primero
                for (int i = 1; i < duplicates.size(); i++) {
                    unlockOrRefundChampionLoot(duplicates.get(i).getId(), false);
                }
            }
        }

        // --- Skins duplicados ---
        List<LootInventorySkinsEntity> lootSkins =
                lootInventorySkinsRepository.findByLootAndIsActiveTrue(userLoot);
        Map<SkinEntity, List<LootInventorySkinsEntity>> groupedSkins = lootSkins.stream()
                .collect(Collectors.groupingBy(LootInventorySkinsEntity::getSkin));
        for (List<LootInventorySkinsEntity> duplicates : groupedSkins.values()) {
            if (duplicates.size() > 1) {
                for (int i = 1; i < duplicates.size(); i++) {
                    unlockOrRefundSkinLoot(duplicates.get(i).getId(), false);
                }
            }
        }

        // --- Icons duplicados ---
        List<LootInventoryIconsEntity> lootIcons =
                lootInventoryIconsRepository.findByLootAndIsActiveTrue(userLoot);
        Map<ProfileIconEntity, List<LootInventoryIconsEntity>> groupedIcons = lootIcons.stream()
                .collect(Collectors.groupingBy(LootInventoryIconsEntity::getIcon));
        for (List<LootInventoryIconsEntity> duplicates : groupedIcons.values()) {
            if (duplicates.size() > 1) {
                for (int i = 1; i < duplicates.size(); i++) {
                    unlockOrRefundIconLoot(duplicates.get(i).getId(), false);
                }
            }
        }
    }

    @Override
    public void delete(Long userLootId) {
        Optional <UserLootEntity> optional = userLootRepository.findById(userLootId);
        if (optional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user loot with id "+userLootId);
        userLootRepository.delete(optional.get());
    }

    @Override
    public void deleteLootInventory(Long idLoot, String typeLoot)
    {
        switch (typeLoot.toUpperCase()) {
            case "CHAMPION":
                lootInventoryChampionsRepository.findById(idLoot).ifPresentOrElse(
                        loot -> lootInventoryChampionsRepository.delete(loot),
                        () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find loot CHAMPION id " + idLoot); }
                );
                break;

            case "SKIN":
                lootInventorySkinsRepository.findById(idLoot).ifPresentOrElse(
                        loot -> lootInventorySkinsRepository.delete(loot),
                        () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find loot SKIN id " + idLoot); }
                );
                break;

            case "ICON":
                lootInventoryIconsRepository.findById(idLoot).ifPresentOrElse(
                        loot -> lootInventoryIconsRepository.delete(loot),
                        () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find loot ICON id " + idLoot); }
                );
                break;

            default:
                throw new IllegalArgumentException("Not supported loot type " + typeLoot);
        }
    }

    public List<?> validateLootInventory(List<Long> ids, boolean isChampion, boolean isSkin, boolean isIcon)
    {
        if (ids.size() != 3) {
            throw new IllegalArgumentException("3 IDs are required. Provided: "+ids.size());
        }

        if ((isChampion ? 1 : 0) + (isSkin ? 1 : 0) + (isIcon ? 1 : 0) != 1) {
            throw new IllegalArgumentException("Just one flag must be true");
        }

        List<?> loots;

        if (isChampion) {
            List<LootInventoryChampionsEntity> found = lootInventoryChampionsRepository.findAllById(ids);
            if (found.size() != 3) throw new IllegalArgumentException("One of the ChampionLoots does not exists");
            if (found.stream().anyMatch(l -> Boolean.FALSE.equals(l.getIsActive()))) {
                throw new IllegalArgumentException("All ChampionLoots must be active");
            }
            checkSameUserLoot(found);
            loots = found;
        } else if (isSkin) {
            List<LootInventorySkinsEntity> found = lootInventorySkinsRepository.findAllById(ids);
            if (found.size() != 3) throw new IllegalArgumentException("One of the SkinLoots does not exists");
            if (found.stream().anyMatch(l -> Boolean.FALSE.equals(l.getIsActive()))) {
                throw new IllegalArgumentException("All SkinLoots must be active");
            }
            checkSameUserLoot(found);
            loots = found;
        } else {
            List<LootInventoryIconsEntity> found = lootInventoryIconsRepository.findAllById(ids);
            if (found.size() != 3) throw new IllegalArgumentException("One of the IconLoots does not exists");
            if (found.stream().anyMatch(l -> Boolean.FALSE.equals(l.getIsActive()))) {
                throw new IllegalArgumentException("All IconLoots must be active");
            }
            checkSameUserLoot(found);
            loots = found;
        }

        return loots;
    }

    private void checkSameUserLoot(List<?> loots) {
        UserLootEntity first = null;

        for (Object loot : loots) {
            UserLootEntity current;

            if (loot instanceof LootInventoryChampionsEntity) {
                current = ((LootInventoryChampionsEntity) loot).getLoot();
            } else if (loot instanceof LootInventorySkinsEntity) {
                current = ((LootInventorySkinsEntity) loot).getLoot();
            } else if (loot instanceof LootInventoryIconsEntity) {
                current = ((LootInventoryIconsEntity) loot).getLoot();
            } else {
                throw new IllegalArgumentException("Loot type not supported");
            }

            if (first == null) {
                first = current;
            } else if (!first.equals(current)) {
                throw new IllegalArgumentException("The loots provided do not belong to the same UserLootEntity");
            }
        }
    }

    private SkinEntity reRollDropSkin (UserEntity userEntity)
    {
        List<UserXChampionEntity> uXc =
                userXChampionRepository.findByUser_Id(userEntity.getId());

        List<UserXSkinEntity> uXs = userXSkinRepository.findByUser_Id(userEntity.getId());

        List<Long> championsOwnedIds = new ArrayList<>();

        for (UserXChampionEntity u : uXc) {
            championsOwnedIds.add(u.getChampion().getId());
        }

        List<SkinEntity> skinsAvailable = skinRepository.findByChampion_IdIn(championsOwnedIds);

        Iterator<SkinEntity> iterator = skinsAvailable.iterator();

        while (iterator.hasNext())
        {
            SkinEntity s = iterator.next();
            for (UserXSkinEntity u : uXs)
            {
                if (s.equals(u.getSkin()))
                {
                    iterator.remove();
                    break;
                }
            }
        }

        Random random = new Random();

        if (!skinsAvailable.isEmpty()) //
        {
            Collections.shuffle(skinsAvailable);

            return getRandomElement(skinsAvailable, random);
        }
        //IF THE USER HAS ALL THE SKINS
        return getRandomElement(skinRepository.findAll(), random);
    }

    private ChampionEntity reRollDropChampion (UserEntity user)
    {
        List<UserXChampionEntity> uXc =
                userXChampionRepository.findByUser_Id(user.getId());

        List<Long> championsOwnedIds = new ArrayList<>();

        for (UserXChampionEntity u : uXc)
        {
            championsOwnedIds.add(u.getChampion().getId());
        }

        List<ChampionEntity> championsAvailable =
                championRepository.findByIdNotIn(championsOwnedIds);

        Random random = new Random();

        if (!championsAvailable.isEmpty()) //
        {
            Collections.shuffle(championsAvailable);

            return getRandomElement(championsAvailable, random);
        }

        //IF THE USER HAS ALL THE CHAMPIONS
        return getRandomElement(championRepository.findAll(), random);

    }

    private ProfileIconEntity reRollDropIcon (UserEntity user)
    {
        List<UserXIconEntity> uXi =
                userXIconRepository.findByUser_Id(user.getId());

        List<Long> iconOwned = new ArrayList<>();

        for (UserXIconEntity u : uXi)
        {
            iconOwned.add(u.getIcon().getId());
        }

        List<ProfileIconEntity> iconsAvailable =
                iconRepository.findByIdNotIn(iconOwned);

        Random random = new Random();

        if (!iconsAvailable.isEmpty()) //
        {
            Collections.shuffle(iconsAvailable);

            return getRandomElement(iconsAvailable, random);
        }

        //IF THE USER HAS ALL THE ICONS
        return getRandomElement(iconRepository.findAll(), random);

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
            // Generate a number between 1 and 10
            int randNum = random.nextInt(10) + 1;

            List<SkinEntity> selectedList;

            if (randNum <= 6) {
                // 1-6 → pick from 975 RP+ skins
                selectedList = skinRepository.findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(975);
            } else if (randNum <= 9) {
                // 7-9 → pick from 1350 RP+ skins
                selectedList = skinRepository.findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(1350);
            } else {
                // 10 → pick from 1820 RP+ skins
                selectedList = skinRepository.findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(1820);
            }

            if (selectedList.isEmpty()) return null;
            Collections.shuffle(selectedList);

            return getRandomElement(selectedList, random);
        }


        int roll = random.nextInt(100); // [0,99]

        if (roll < 50) {
            // 50% Champion
            List<ChampionEntity> champions = championRepository.findAll();
            if (champions.isEmpty()) return null;

            return getRandomElement(champions, random);
        } else if (roll < 85) {
            // 35% Skin
            List<SkinEntity> skins = skinRepository.findAll();
            if (skins.isEmpty()) return null;

            return getRandomElement(skins, random);
        } else {
            // 15% Icon
            List<ProfileIconEntity> icons = iconRepository.findAll();
            if (icons.isEmpty()) return null;

            return getRandomElement(icons, random);
        }
    }

    public void giveRewardsToPlayersFromMatch(MatchEntity match) {
        TeamEntity winnerTeam = match.getWinnerTeam();
        Random random = new Random();

        for (PlayerMatchDetailEntity playerDetail : match.getPlayerDetails()) {

            Optional<UserLootEntity> optional =
                    userLootRepository.findByUser_Id(playerDetail.getUser().getId());

            if (optional.isEmpty())
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Did not find user loot for the user with id " + playerDetail.getUser().getId()
                );

            UserLootEntity updatedLoot = optional.get();

            boolean isWinner = playerDetail.getTeam().equals(winnerTeam);
            boolean isRanked = match.getRanked() != null && match.getRanked();

            int numRolls = 0;

            if (isRanked) {
                numRolls = isWinner ? 4 : 2; // ranked win = 4, ranked loss = 2
            } else {
                numRolls = isWinner ? 2 : 0; // normal win = 2, normal loss = 0
            }

            int totalChests = updatedLoot.getChests() + updatedLoot.getMasterChests();
            int totalKeys = updatedLoot.getKeys();

            boolean hasChestOverflow = (totalChests - totalKeys) >= 4;

            if (hasChestOverflow) {
                updatedLoot.setKeys(updatedLoot.getKeys() + 1);
            } else {
                for (int i = 0; i < numRolls; i++) {
                    int roll = random.nextInt(100) + 1; // 1-100

                    if (roll <= 35) {
                        updatedLoot.setChests(updatedLoot.getChests() + 1);
                    } else if (roll <= 80) {
                        updatedLoot.setKeys(updatedLoot.getKeys() + 1);
                    } else if (roll <= 95) {
                        updatedLoot.setMasterChests(updatedLoot.getMasterChests() + 1);
                    } else {
                        updatedLoot.setOrangeEssence(updatedLoot.getOrangeEssence() + 150);
                    }
                }
            }
            userLootRepository.save(updatedLoot);
        }
    }



    private <T> T getRandomElement(List<T> list, Random random) {
        return list.get(random.nextInt(list.size()));
    }



}

