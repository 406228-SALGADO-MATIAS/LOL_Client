package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import LoL_Client_Back.models.domain.UserMatches;
import LoL_Client_Back.repositories.domain.UserMatchesRepository;
import LoL_Client_Back.services.interfaces.domain.UserMatchesService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    @Override
    public UserMatches findByUser(UserEntity userEntity) {
        Optional<UserMatchesEntity> optional
                = userMatchesRepository.findByUser(userEntity);
        if (optional.isPresent())
        {
            return modelMapper.map(optional.get(),UserMatches.class);
        }
        return new UserMatches();
    }
}
