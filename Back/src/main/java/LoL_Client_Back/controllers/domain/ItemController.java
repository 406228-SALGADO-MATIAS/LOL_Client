package LoL_Client_Back.controllers.domain;

import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.dtos.items.ItemDTO;
import LoL_Client_Back.models.domain.Item;
import LoL_Client_Back.services.interfaces.domain.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("items")
public class ItemController {
    @Autowired
    ItemService itemService;

    @GetMapping("/getById/{id}")
    ResponseEntity<ItemDTO> getById(@PathVariable Long id)
    {
        return ResponseEntity.ok(itemService.findById(id));
    }

    @GetMapping("/getAll")
    ResponseEntity<List<ItemDTO>> findAll()
    {
        return ResponseEntity.ok(itemService.getAll());
    }

    @GetMapping("/findByName/{name}")
    ResponseEntity<List<ItemDTO>> findByName(@PathVariable String name)
    {
        return ResponseEntity.ok(itemService.findByName(name));
    }

    @GetMapping("/getByItemType")
    ResponseEntity<List<ItemDTO>> getByItemType(@RequestParam ChampionStyle type)
    {
        return ResponseEntity.ok(itemService.getByItemType(type));
    }
    @GetMapping("/getByItemType/1Or2")
    ResponseEntity<List<ItemDTO>> getByItemTypeOrItemType2(@RequestParam ChampionStyle type)
    {
        return ResponseEntity.ok(itemService.getByItemType1Or2(type));
    }
    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO dto,
                                              @RequestParam ChampionStyle itemType,
                                              @RequestParam (required = false) ChampionStyle itemType2) {
        ItemDTO createdItem = itemService.createItem(dto,itemType,itemType2);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id,
                                              @RequestBody ItemDTO dto,
                                              @RequestParam(required = false) ChampionStyle itemType,
                                              @RequestParam(required = false) ChampionStyle itemType2) {
        ItemDTO updatedItem = itemService.updateItem(id, dto, itemType, itemType2);
        return ResponseEntity.ok(updatedItem);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
