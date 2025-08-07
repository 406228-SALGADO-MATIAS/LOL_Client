package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.entities.domain.PlayerMatchDetailEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.models.domain.UserMatches;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserMatchesService {
    UserMatches createUserMatches(UserEntity userEntity);
    UserMatches findByUser (UserEntity userEntity);
    void updateUsers(List<PlayerMatchDetailEntity> players);
}
