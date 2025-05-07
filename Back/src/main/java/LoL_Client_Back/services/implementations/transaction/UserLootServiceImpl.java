package LoL_Client_Back.services.implementations.transaction;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.transaction.UserLoot;
import LoL_Client_Back.repositories.transaction.UserLootRepository;
import LoL_Client_Back.services.interfaces.transaction.UserLootService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLootServiceImpl implements UserLootService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserLootRepository userLootRepository;

    @Override
    public UserLoot createUserLoot(UserEntity user) {
        UserLootEntity userLootEntity = new UserLootEntity();
        userLootEntity.setKeys(1);
        userLootEntity.setChests(1);
        userLootEntity.setOrangeEssence(1050);
        userLootEntity.setUser(user);

        return modelMapper.map
                (userLootRepository.save(userLootEntity),UserLoot.class);

    }
}
