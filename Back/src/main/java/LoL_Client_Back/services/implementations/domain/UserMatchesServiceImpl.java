package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMatchesServiceImpl implements UserMatchesService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserMatchesRepository userMatchesRepository;

    @Override
    public UserMatches createUserMatches(UserEntity userEntity) {
        UserMatchesEntity userMatchesEntity = new UserMatchesEntity();
        userMatchesEntity.setUser(userEntity);

        return modelMapper.map
                (userMatchesRepository.save(userMatchesEntity),
                        UserMatches.class);
    }
}
