package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.models.domain.UserMatches;
import org.springframework.stereotype.Service;

@Service
public interface UserMatchesService {
    UserMatches createUserMatches(UserEntity userEntity);
    UserMatches findByUser (UserEntity userEntity);
}
