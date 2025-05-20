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
       return buildItemDTO(itemRepository.save(buildItemEntity(dto, itemType,itemType2)));
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO dto, ChampionStyle itemType, ChampionStyle itemType2) {
        Optional<ItemEntity> opt = itemRepository.findById(id);
        if (opt.isPresent())
        {
            return buildItemDTO(itemRepository.save(
                    updateItemEntity(opt.get(),dto,itemType,itemType2)
            ));
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
}
