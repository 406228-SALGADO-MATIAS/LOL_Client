package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.dtos.items.ItemDTO;
import LoL_Client_Back.entities.domain.ItemEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.models.domain.Item;
import LoL_Client_Back.repositories.domain.ItemRepository;
import LoL_Client_Back.repositories.reference.ChampionStyleRepository;
import LoL_Client_Back.services.interfaces.domain.ChampionService;
import LoL_Client_Back.services.interfaces.domain.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    @Qualifier("customModelMapper")
    private ModelMapper customMapper;
    @Autowired
    ChampionStyleRepository championStyleRepository;

    @Override
    public ItemDTO findById(Long id) {
        Optional<ItemEntity> optional =
                itemRepository.findById(id);
        if (optional.isPresent()){
            return buildItemDTO(optional.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find item by id "+id);
    }

    @Override
    public List<ItemDTO> getByItemType(ChampionStyle style) {
        return buildItemDTOList(itemRepository.findByItemType(getChampionStyle(style.name())),
                "Did not find champions with style "+style.name());
    }

    @Override
    public List<ItemDTO> findByName(String name) {
        return buildItemDTOList(itemRepository.findByNameIgnoreCaseContaining(name),
                "Did not find items named like "+name);
    }

    @Override
    public List<ItemDTO> getAll() {
        List<ItemEntity> entities = itemRepository.findAll();
        return buildItemDTOList(entities, "Did not find any items");
    }

    @Override
    public List<ItemDTO> getByItemType1Or2(ChampionStyle style) {
        ChampionStyleEntity s = getChampionStyle(style.name());
        return buildItemDTOList(itemRepository.findByItemTypeOrItemType2(s,s),
                "Did not find item types to be "+style.name());
    }

    @Override
    public ItemDTO createItem(ItemDTO dto, ChampionStyle itemType, ChampionStyle itemType2) {

        ItemEntity item = buildItemEntity(dto,itemType,itemType2);
        checkRepeatedItemName(item.getName(),null);
        if (!existsItemWithSameStats(item))
        {
            return buildItemDTO(itemRepository.save(item));
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,
                "There is already an item with those stats");
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO dto, ChampionStyle itemType, ChampionStyle itemType2) {
        Optional<ItemEntity> opt = itemRepository.findById(id);
        if (opt.isPresent())
        {
            ItemEntity item = updateItemEntity(opt.get(),dto,itemType,itemType2);
            checkRepeatedItemName(item.getName(),item.getId());
            if (!existsItemWithSameStats(item))
            {
                return buildItemDTO(itemRepository.save(item));
            }
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "There is already an item with those stats");
        }
        throw new ResponseStatusException
                (HttpStatus.NOT_FOUND,"Did not find item with id "+id +" to update");
    }

    @Override
    public void deleteItem(Long id) {
        Optional<ItemEntity> opt = itemRepository.findById(id);
        if (opt.isPresent()) {
            itemRepository.delete(opt.get());
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Item with id " + id + " not found for deletion"
            );
        }
    }

    private ItemEntity updateItemEntity(ItemEntity item, ItemDTO dto,
                                        ChampionStyle itemType, ChampionStyle itemType2) {
        customMapper.map(dto, item); // sets the dto data into the item data

        if (itemType != null)
            item.setItemType(getChampionStyle(itemType.name()));

        if (itemType2 != null)
            item.setItemType2(getChampionStyle(itemType2.name()));

        return item;
    }

    private ItemEntity buildItemEntity(ItemDTO dto, ChampionStyle itemType,ChampionStyle itemType2) {
        ItemEntity ent = customMapper.map(dto,ItemEntity.class);
        if (itemType != null) ent.setItemType(getChampionStyle(itemType.name()));
        if (itemType2 != null) ent.setItemType2(getChampionStyle(itemType2.name()));
        return ent;
    }


    private ItemDTO buildItemDTO (ItemEntity item)
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

    private List<ItemDTO> buildItemDTOList (List<ItemEntity> list, String errorMsg)
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

    private ChampionStyleEntity getChampionStyle (String style)
    {
        Optional<ChampionStyleEntity> s =
                championStyleRepository.findByStyleIgnoreCase(style);
        if (s.isPresent()) {
            return s.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion style "+style);
    }

    public boolean existsItemWithSameStats(ItemEntity itemToCheck) {
        List<ItemEntity> allItems = itemRepository.findAll();

        for (ItemEntity existing : allItems) {
            if (Objects.equals(itemToCheck.getId(), existing.getId())) {
                continue; // Ignoramos el mismo item que estamos editando
            }
            boolean matches = true;

            if (itemToCheck.getAttackDamage() != null && itemToCheck.getAttackDamage() != 0) {
                if (!Objects.equals(itemToCheck.getAttackDamage(), existing.getAttackDamage())) matches = false;
            } else if (existing.getAttackDamage() != null && existing.getAttackDamage() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getCriticalStrikeChance() != null && !itemToCheck.getCriticalStrikeChance().equals("0%")) {
                if (!Objects.equals(itemToCheck.getCriticalStrikeChance(), existing.getCriticalStrikeChance())) matches = false;
            } else if (existing.getCriticalStrikeChance() != null && !existing.getCriticalStrikeChance().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getAttackSpeed() != null && !itemToCheck.getAttackSpeed().equals("0%")) {
                if (!Objects.equals(itemToCheck.getAttackSpeed(), existing.getAttackSpeed())) matches = false;
            } else if (existing.getAttackSpeed() != null && !existing.getAttackSpeed().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getAbilityPower() != null && itemToCheck.getAbilityPower() != 0) {
                if (!Objects.equals(itemToCheck.getAbilityPower(), existing.getAbilityPower())) matches = false;
            } else if (existing.getAbilityPower() != null && existing.getAbilityPower() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getHealth() != null && itemToCheck.getHealth() != 0) {
                if (!Objects.equals(itemToCheck.getHealth(), existing.getHealth())) matches = false;
            } else if (existing.getHealth() != null && existing.getHealth() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getHealthRegeneration() != null && !itemToCheck.getHealthRegeneration().equals("0%")) {
                if (!Objects.equals(itemToCheck.getHealthRegeneration(), existing.getHealthRegeneration())) matches = false;
            } else if (existing.getHealthRegeneration() != null && !existing.getHealthRegeneration().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getMana() != null && itemToCheck.getMana() != 0) {
                if (!Objects.equals(itemToCheck.getMana(), existing.getMana())) matches = false;
            } else if (existing.getMana() != null && existing.getMana() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getManaRegeneration() != null && !itemToCheck.getManaRegeneration().equals("0%")) {
                if (!Objects.equals(itemToCheck.getManaRegeneration(), existing.getManaRegeneration())) matches = false;
            } else if (existing.getManaRegeneration() != null && !existing.getManaRegeneration().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getArmor() != null && itemToCheck.getArmor() != 0) {
                if (!Objects.equals(itemToCheck.getArmor(), existing.getArmor())) matches = false;
            } else if (existing.getArmor() != null && existing.getArmor() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getTenacity() != null && !itemToCheck.getTenacity().equals("0%")) {
                if (!Objects.equals(itemToCheck.getTenacity(), existing.getTenacity())) matches = false;
            } else if (existing.getTenacity() != null && !existing.getTenacity().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getMagicResistance() != null && itemToCheck.getMagicResistance() != 0) {
                if (!Objects.equals(itemToCheck.getMagicResistance(), existing.getMagicResistance())) matches = false;
            } else if (existing.getMagicResistance() != null && existing.getMagicResistance() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getCoolDownReduction() != null && itemToCheck.getCoolDownReduction() != 0) {
                if (!Objects.equals(itemToCheck.getCoolDownReduction(), existing.getCoolDownReduction())) matches = false;
            } else if (existing.getCoolDownReduction() != null && existing.getCoolDownReduction() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getMovementSpeed() != null && !itemToCheck.getMovementSpeed().equals("0%")) {
                if (!Objects.equals(itemToCheck.getMovementSpeed(), existing.getMovementSpeed())) matches = false;
            } else if (existing.getMovementSpeed() != null && !existing.getMovementSpeed().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getLifeSteal() != null && !itemToCheck.getLifeSteal().equals("0%")) {
                if (!Objects.equals(itemToCheck.getLifeSteal(), existing.getLifeSteal())) matches = false;
            } else if (existing.getLifeSteal() != null && !existing.getLifeSteal().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getArmorPenetration() != null && !itemToCheck.getArmorPenetration().equals("0%")) {
                if (!Objects.equals(itemToCheck.getArmorPenetration(), existing.getArmorPenetration())) matches = false;
            } else if (existing.getArmorPenetration() != null && !existing.getArmorPenetration().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getMagicPenetration() != null && !itemToCheck.getMagicPenetration().equals("0%")) {
                if (!Objects.equals(itemToCheck.getMagicPenetration(), existing.getMagicPenetration())) matches = false;
            } else if (existing.getMagicPenetration() != null && !existing.getMagicPenetration().equals("0%")) matches = false;

            if (!matches) continue;

            if (itemToCheck.getLethality() != null && itemToCheck.getLethality() != 0) {
                if (!Objects.equals(itemToCheck.getLethality(), existing.getLethality())) matches = false;
            } else if (existing.getLethality() != null && existing.getLethality() != 0) matches = false;

            if (!matches) continue;

            if (itemToCheck.getHealingAndShieldPower() != null && !itemToCheck.getHealingAndShieldPower().equals("0%")) {
                if (!Objects.equals(itemToCheck.getHealingAndShieldPower(), existing.getHealingAndShieldPower())) matches = false;
            } else if (existing.getHealingAndShieldPower() != null && !existing.getHealingAndShieldPower().equals("0%")) matches = false;

            if (matches) return true;
        }

        return false;
    }

    private void checkRepeatedItemName(String name, Long currentItemId) {
        Optional<ItemEntity> existingItem = itemRepository.findByNameIgnoreCase(name);
        if (existingItem.isPresent() && !Objects.equals(existingItem.get().getId(), currentItemId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Already exists an item named " + name);
        }
    }

}
