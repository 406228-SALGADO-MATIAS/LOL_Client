package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.dtos.item.ItemDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {
    ItemDTO findById(Long id);
    List<ItemDTO> getByItemType(ChampionStyle style);
    List<ItemDTO> findByName(String name);
    List<ItemDTO> getAll();
    List<ItemDTO> getByItemType1Or2(ChampionStyle style);
    ItemDTO createItem (ItemDTO dto, ChampionStyle itemType, ChampionStyle itemType2);
    ItemDTO updateItem (Long id, ItemDTO dto, ChampionStyle itemType, ChampionStyle itemType2);
    void deleteItem(Long id);
}
