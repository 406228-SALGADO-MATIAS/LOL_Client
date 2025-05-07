package LoL_Client_Back.services.interfaces.transaction;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.transaction.UserLootEntity;
import LoL_Client_Back.models.transaction.UserLoot;
import org.springframework.stereotype.Service;

@Service
public interface UserLootService {
    UserLoot createUserLoot (UserEntity user);
}
