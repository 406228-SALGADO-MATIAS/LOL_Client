package LoL_Client_Back.dtos;

import LoL_Client_Back.dtos.association.UserXChampionDTO;
import LoL_Client_Back.dtos.association.UserXIconDTO;
import LoL_Client_Back.dtos.association.UserXSkinDTO;
import LoL_Client_Back.dtos.champion.ChampionDTO;
import LoL_Client_Back.dtos.enums.MatchType;
import LoL_Client_Back.dtos.item.ItemDTO;
import LoL_Client_Back.dtos.loot.LootInventoryChampionDTO;
import LoL_Client_Back.dtos.loot.LootInventoryIconDTO;
import LoL_Client_Back.dtos.loot.LootInventorySkinDTO;
import LoL_Client_Back.dtos.loot.UserLootDTO;
import LoL_Client_Back.dtos.match.MatchDTO;
import LoL_Client_Back.dtos.match.PlayerMatchDetailDTO;
import LoL_Client_Back.dtos.match.PlayerMatchItemDTO;
import LoL_Client_Back.dtos.reference.ProfileIconDTO;
import LoL_Client_Back.dtos.skin.SkinDTO;
import LoL_Client_Back.dtos.user.UserLootMatchesDTO;
import LoL_Client_Back.dtos.user.UserMatchesDTO;
import LoL_Client_Back.dtos.user.UserMatchesWinrateDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.*;
import LoL_Client_Back.entities.reference.PlayerMatchItemEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.domain.User;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class DTOBuilder
{
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserMatchesService userMatchesService;

    public List<MatchDTO> buildMatchDTOList(List<MatchEntity> matchEntities,
                                             boolean showChampion, boolean showItem) {
        List<MatchDTO> matchDTOs = new ArrayList<>();
        for (MatchEntity matchEntity : matchEntities) {
            MatchDTO dto = buildMatchDTO(matchEntity, showChampion, showItem);
            matchDTOs.add(dto);
        }
        return matchDTOs;
    }

    //MATCH DTO
    public MatchDTO buildMatchDTO(MatchEntity matchEntity,
                                   boolean showChampion, boolean showItem) {
        MatchDTO matchDTO = customMapper.map(matchEntity, MatchDTO.class);
        matchDTO.setServerRegion(matchEntity.getServerRegion().getServer());
        matchDTO.setMap(matchEntity.getMap().getMap());
        matchDTO.setWinnerTeam(matchEntity.getWinnerTeam().getTeamColor());
        //details
        matchDTO.setPlayers(buildPlayerMatchDetailDTOList
                (matchEntity.getPlayerDetails(), showChampion, showItem));
        return matchDTO;
    }

    //DETAIL DTO
    public List<PlayerMatchDetailDTO> buildPlayerMatchDetailDTOList(List<PlayerMatchDetailEntity> detailEntities,
                                                                     boolean showChampion, boolean showItem) {
        List<PlayerMatchDetailDTO> dtoList = new ArrayList<>();

        for (PlayerMatchDetailEntity detail : detailEntities) {
            PlayerMatchDetailDTO dto = customMapper.map(detail, PlayerMatchDetailDTO.class);
            dto.setId(detail.getId());
            dto.setMatchId(detail.getMatch().getId());
            dto.setTeamMember(detail.getTeam().getTeamColor());

            if (detail.getRole() != null) { //FOR ARAM, THERE ARE NO ROLES
                dto.setRole(detail.getRole().getRole());
            }

            dto.setChampion(detail.getChampion().getName());
            dto.setUserNickname(detail.getUser().getNickname());
            dto.setIdUser(detail.getUser().getId());
            if (detail.getUser().getRank() == null) {
                dto.setElo("UNRANKED");
            } else
                dto.setElo(detail.getUser().getRank().getRank());

            if (showChampion)
                dto.setImageUrlChampion(detail.getChampion().getImage());

            dto.setItems(buildPlayerMatchItemsDTOList(detail.getItems(), showItem));

            dtoList.add(dto);
        }
        return dtoList;
    }

    //ITEMS DTO
    public List<PlayerMatchItemDTO> buildPlayerMatchItemsDTOList(List<PlayerMatchItemEntity> playerItems,
                                                                  boolean showItem) {
        List<PlayerMatchItemDTO> dtoList = new ArrayList<>();
        for (PlayerMatchItemEntity playerItem : playerItems) {
            PlayerMatchItemDTO dto = new PlayerMatchItemDTO();
            dto.setId(playerItem.getId());
            dto.setIdItem(playerItem.getItem().getId());
            dto.setIdMatchDetail(playerItem.getPlayerMatchDetail().getId());
            dto.setItemName(playerItem.getItem().getName());
            dto.setType(playerItem.getItem().getItemType().getStyle());
            if (playerItem.getItem().getItemType2() != null)
                dto.setType2(playerItem.getItem().getItemType2().getStyle());
            if (showItem)
                dto.setImageUrlItem(playerItem.getItem().getImage());
            dtoList.add(dto);
        }
        return dtoList;
    }

    public ItemDTO buildItemDTO (ItemEntity item)
    {
        ItemDTO dto = customMapper.map(item,ItemDTO.class);
        if (item.getItemType() != null)
        {
            dto.setItemType(item.getItemType().getStyle());
        }
        if (item.getItemType2() != null) {
            dto.setItemType2(item.getItemType2().getStyle());
        }
        return dto;
    }

    public List<ItemDTO> buildItemDTOList (List<ItemEntity> list, String errorMsg)
    {
        if (!list.isEmpty())
        {
            List<ItemDTO> dtoList = new ArrayList<>();
            for (ItemEntity i : list) {
                dtoList.add(buildItemDTO(i));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public ChampionDTO buildChampionDTO(ChampionEntity c) {
        ChampionDTO dto = customMapper.map(c, ChampionDTO.class);

        if (c.getPrice() != null && c.getPrice().getBlueEssenceCost() != null) {
            dto.setBlueEssencePrice(c.getPrice().getBlueEssenceCost());
        }

        if (c.getRole() != null && c.getRole().getRole() != null) {
            dto.setMainRole(c.getRole().getRole());
        }

        if (c.getRole2() != null && c.getRole2().getRole() != null) {
            dto.setSideRole(c.getRole2().getRole());
        }

        if (c.getDifficulty() != null && c.getDifficulty().getDifficulty() != null) {
            dto.setDifficulty(c.getDifficulty().getDifficulty());
        }

        if (c.getStyle() != null && c.getStyle().getStyle() != null) {
            dto.setStyle(c.getStyle().getStyle());
        }

        if (c.getStyle2() != null && c.getStyle2().getStyle() != null) {
            dto.setStyle2(c.getStyle2().getStyle());
        }

        return dto;
    }

    public List<ChampionDTO> buildChampionDTOList (List<ChampionEntity> championEntities, String errorMsg)
    {
        if (!championEntities.isEmpty())
        {
            List<ChampionDTO> dtoList = new ArrayList<>();
            for (ChampionEntity c : championEntities)
            {
                dtoList.add(buildChampionDTO(c));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public SkinDTO buildSkinDTO (SkinEntity s) {
        SkinDTO dto = customMapper.map(s,SkinDTO.class);
        dto.setChampionName(s.getChampion().getName());
        dto.setRpCost(s.getTier().getRpCost());
        dto.setOrangeEssenceCost(s.getTier().getOrangeEssenceCost());
        return dto;
    }

    public List<SkinDTO> buildSkinDTOList (List<SkinEntity> list, String errorMsg) {
        if (!list.isEmpty()) {
            List<SkinDTO> dtos = new ArrayList<>();
            for (SkinEntity s : list) {
                dtos.add(buildSkinDTO(s));
            }
            return dtos;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public UserMatchesWinrateDTO buildUserMatchesWinrateDTO(UserMatchesEntity uM, MatchType matchType)
    {
        UserMatchesWinrateDTO dto = new UserMatchesWinrateDTO();
        UserEntity u = uM.getUser();

        dto.setUser_id(u.getId());
        dto.setNickname(u.getNickname());
        dto.setRank(u.getRank().getRank());
        dto.setServer(u.getServer().getServer());

        switch (matchType) {
            case RANKED -> {
                dto.setRankedsPlayed(uM.getRankedsPlayed());
                dto.setRankedWins(uM.getRankedWins());
                dto.setRankedWinrate(calculateWinrate(uM.getRankedsPlayed(), uM.getRankedWins()));
            }
            case NORMAL -> {
                dto.setNormalGamesPlayed(uM.getNormalGamesPlayed());
                dto.setNormalWins(uM.getNormalWins());
                dto.setNormalWinrate(calculateWinrate(uM.getNormalGamesPlayed(), uM.getNormalWins()));
            }
            case ARAM -> {
                dto.setAramsPlayed(uM.getAramsPlayed());
                dto.setAramWins(uM.getAramWins());
                dto.setAramWinrate(calculateWinrate(uM.getAramsPlayed(), uM.getAramWins()));
            }
        }
        return dto;
    }

    public Double calculateWinrate(double gamesPlayed, double wins) {
        if (gamesPlayed == 0) {
            return 0.0;
        }
        return (wins / gamesPlayed) * 100;
    }

    public UserLootMatchesDTO buildUserLootMatchesDTO (User user, UserLoot loot, UserMatches matches)
    {
        UserLootMatchesDTO dto = new UserLootMatchesDTO();
        dto.setUser_id(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname());
        dto.setRegistrationDate(user.getRegistrationDate());
        if (user.getRank() != null)
        {
            dto.setRank(user.getRank().getRank());
        }
        dto.setServer(user.getServer().getServer());

        dto.setChests(loot.getChests());
        dto.setKeys(loot.getKeys());
        dto.setLoot_id(loot.getId());

        dto.setMatches_id(matches.getId());
        dto.setNormalGamesPlayed(matches.getNormalGamesPlayed());
        dto.setRankedsPlayed(matches.getRankedsPlayed());
        dto.setAramsPlayed(matches.getAramsPlayed());

        return dto;
    }

    public UserMatchesDTO buildUserMatchesDTO (UserEntity user) {

        UserMatchesDTO dto = new UserMatchesDTO();
        dto.setUser_id(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname());
        dto.setRegistrationDate(user.getRegistrationDate());

        if (user.getRank() != null)
        {
            dto.setRank(user.getRank().getRank());
        }

        dto.setServer(user.getServer().getServer());

        UserMatches userMatches =
                userMatchesService.findByUser
                        (modelMapper.map(user,UserEntity.class));

        dto.setMatches_id(userMatches.getId());
        dto.setNormalGamesPlayed(userMatches.getNormalGamesPlayed());
        dto.setRankedsPlayed(userMatches.getRankedsPlayed());
        dto.setAramsPlayed(userMatches.getAramsPlayed());

        return dto;
    }

    public List<UserMatchesDTO> buildUserMatchesDTOList (List<UserEntity> usersEntity, String errorMsg)
    {
        List<UserMatchesDTO> userMatchesDTOS = new ArrayList<>();
        if (!usersEntity.isEmpty())
        {
            for (UserEntity u : usersEntity)
            {
                userMatchesDTOS.add(buildUserMatchesDTO(u));
            }
            return userMatchesDTOS;
        }
        throw new EntityNotFoundException(errorMsg);
    }

    public UserXChampionDTO buildUserXChampionDTO(UserXChampionEntity entity) {

        UserXChampionDTO dto = customMapper.map(entity, UserXChampionDTO.class);
        dto.setIdUser(entity.getUser().getId());
        dto.setNickname(entity.getUser().getNickname());

        if (entity.getUser().getServer() != null) {
            dto.setServer(entity.getUser().getServer().getServer());
        }

        if (entity.getUser().getRank() != null) {
            dto.setRank(entity.getUser().getRank().getRank());
        }

        dto.setChampionId(entity.getChampion().getId());
        dto.setChampionName(entity.getChampion().getName());

        return dto;
    }

    public UserXIconDTO buildUserXIconDTO(UserXIconEntity entity) {
        UserXIconDTO dto = customMapper.map(entity, UserXIconDTO.class);
        dto.setId(entity.getId());
        dto.setIdIcon(entity.getIcon().getId());
        dto.setIcon(entity.getIcon().getIcon());
        dto.setBlueEssencePrice(entity.getIcon().getPrice().getBlueEssenceCost());
        dto.setIdUser(entity.getUser().getId());
        dto.setNickname(entity.getUser().getNickname());

        if (entity.getUser().getServer() != null) {
            dto.setServer(entity.getUser().getServer().getServer());
        }
        if (entity.getUser().getRank() != null) {
            dto.setRank(entity.getUser().getRank().getRank());
        }

        return dto;
    }

    public List<UserXIconDTO> buildListUserXIconDTO(List<UserXIconEntity> list, String errorMsg) {
        if (!list.isEmpty()) {
            List<UserXIconDTO> dtoList = new ArrayList<>();
            for (UserXIconEntity u : list) {
                dtoList.add(buildUserXIconDTO(u));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, errorMsg);
    }

    public UserXSkinDTO buildUserXSkinDTO(UserXSkinEntity entity) {

        UserXSkinDTO dto = customMapper.map(entity, UserXSkinDTO.class);
        dto.setIdUser(entity.getUser().getId());
        dto.setNickname(entity.getUser().getNickname());

        if (entity.getUser().getServer() != null) {
            dto.setServer(entity.getUser().getServer().getServer());
        }

        if (entity.getUser().getRank() != null) {
            dto.setRank(entity.getUser().getRank().getRank());
        }

        dto.setSkinId(entity.getSkin().getId());
        dto.setSkinName(entity.getSkin().getName());

        if (entity.getSkin().getTier() != null)
        {
            dto.setRpPrice(entity.getSkin().getTier().getRpCost());
        }
        return dto;
    }

    public List<UserXSkinDTO> buildListUserXSkinDTO
            (List<UserXSkinEntity> list, String errorMsg)
    {
        if (!list.isEmpty())
        {
            List<UserXSkinDTO> dtoList = new ArrayList<>();
            for (UserXSkinEntity u : list)
            {
                dtoList.add(buildUserXSkinDTO(u));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public List<UserXChampionDTO> buildListUserXChampionDTO (List<UserXChampionEntity> list, String errorMsg)
    {
        if (!list.isEmpty())
        {
            List<UserXChampionDTO> dtoList = new ArrayList<>();
            for (UserXChampionEntity u : list)
            {
                dtoList.add(buildUserXChampionDTO(u));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public ProfileIconDTO buildIconDTO (ProfileIconEntity iconEnt, Optional<ProfileIconEntity> optional,
                                         String notFoundMsg) {
        ProfileIconDTO dto;
        if (optional != null && optional.isPresent())
        {
            dto = customMapper.map(optional.get(),ProfileIconDTO.class);
            dto.setBlueEssencePrice(optional.get().getPrice().getBlueEssenceCost());
            return dto;
        }
        else if (iconEnt != null)
        {
            dto = customMapper.map(iconEnt,ProfileIconDTO.class);
            dto.setBlueEssencePrice(iconEnt.getPrice().getBlueEssenceCost());
            return dto;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,notFoundMsg);
    }

    public List<ProfileIconDTO> buildDtoList (List<ProfileIconEntity> list, String errorMsg) {
        if (!list.isEmpty()) {
            List<ProfileIconDTO> dtoList = new ArrayList<>();
            for (ProfileIconEntity i : list)
            {
                dtoList.add(buildIconDTO(i,Optional.empty(),""));
            }
            return  dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

    public UserLootDTO buildUserLootDTO(UserLootEntity userLootEntity, boolean showInactives)
    {

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
}
