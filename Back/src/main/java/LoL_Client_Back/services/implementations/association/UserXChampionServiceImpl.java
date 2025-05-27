package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.association.UserXChampionDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserXChampionServiceImpl implements UserXChampionService {

    @Autowired
    UserXChampionRepository userXChampionRepository;
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    ChampionRepository championRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public UserXChampionDTO findById(Long id) {
        Optional<UserXChampionEntity> optional =
                userXChampionRepository.findById(id);
        if (optional.isPresent())
        {
            return buildUserXChampionDTO(optional.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion belonging with id "+id);
    }

    @Override
    public List<UserXChampionDTO> getAll() {
        return buildListUserXChampionDTO(userXChampionRepository.findAll(),
                "Did not find any champion belongings");
    }

    @Override
    public List<UserXChampionDTO> findByChampionId(Long id) {
        return buildListUserXChampionDTO(userXChampionRepository.findByChampion_Id(id),
                "Did not find any champion belongings for the champion id "+id);
    }

    @Override
    public List<UserXChampionDTO> findByUserId(Long id) {
        return buildListUserXChampionDTO(userXChampionRepository.findByUser_Id(id),
                "Did not find any champion belongings for the user id "+id);
    }

    @Override
    public UserXChampionDTO findByUserAndChampion(Long championId, Long userId) {
        Optional<ChampionEntity> c = championRepository.findById(championId);
        Optional<UserEntity> u = userRepository.findById(userId);
        if (c.isPresent())
        {
            if (u.isPresent())
            {
                Optional<UserXChampionEntity> opt =
                        userXChampionRepository.findByUserAndChampion(u.get(),c.get());
                if (opt.isPresent())
                {
                    return buildUserXChampionDTO(opt.get());
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "The user with id "+userId+", nicknamed " +u.get().getNickname()+
                                " does not have the champion "+c.get().getName() + " (id "+championId+")");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find the user with id "+userId);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find the champion with id "+championId);
    }

    @Override
    public void deleteById(Long id) {
        Optional<UserXChampionEntity> opt =
                userXChampionRepository.findById(id);
        if (opt.isPresent()) {
            userXChampionRepository.deleteById(id);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find champion belonging with id " +id);
        }
    }

    @Override
    public UserXChampionDTO createChampionBelonging(Long idUser, Long idChampion) {
        Optional<ChampionEntity> c = championRepository.findById(idChampion);
        Optional<UserEntity> u = userRepository.findById(idUser);
        if (u.isPresent())
        {
            if (c.isPresent()) {

                //verifying that the user does have the champion already
                verifyExistingRegister(u.get(),c.get());

                UserXChampionEntity entity = new UserXChampionEntity();
                entity.setChampion(c.get());
                entity.setUser(u.get());
                entity.setMasteryLevel(0);
                entity.setAdquisitionDate(LocalDateTime.now());
                return buildUserXChampionDTO(userXChampionRepository.save(entity));
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find champion with id " +idChampion);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find user with id " +idUser);
    }

    @Override
    public UserXChampionDTO updateChampionBelongiong(Long idBelonging, Long idUser,
                                                     Long idChampion, Integer masteryLevel) {
        Optional<UserXChampionEntity> uxc =
                userXChampionRepository.findById(idBelonging);
        if (uxc.isPresent())
        {
            Optional<UserEntity> u = userRepository.findById(idUser);
            if (u.isPresent()) {
                Optional<ChampionEntity> c = championRepository.findById(idChampion);
                if (c.isPresent())
                {
                    //verifying that the user does have the champion already
                    verifyExistingRegister(u.get(),c.get());

                    UserXChampionEntity updated = uxc.get();
                    updated.setAdquisitionDate(LocalDateTime.now());
                    if (masteryLevel != null)
                    {
                        updated.setMasteryLevel(masteryLevel);
                    }
                    updated.setUser(u.get());
                    updated.setChampion(c.get());
                    return buildUserXChampionDTO(userXChampionRepository.save(updated));
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Did not find champion with id " +idChampion + " to update");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find user with id " +idUser+ " to update");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find champion belonging with id " +idBelonging+ " to update");
    }

    private UserXChampionDTO buildUserXChampionDTO(UserXChampionEntity entity) {

        UserXChampionDTO dto = customMapper.map(entity, UserXChampionDTO.class);
        dto.setIdUser(entity.getUser().getId());
        dto.setNickname(entity.getUser().getNickname());

        if (entity.getUser().getServer() != null) {
            dto.setServer(entity.getUser().getServer().getServer());
        }

        if (entity.getUser().getRank() != null) {
            dto.setRank(entity.getUser().getRank().getRank());
        }

        dto.setChampionId(entity.getChampion().getId());
        dto.setChampionName(entity.getChampion().getName());

        return dto;
    }

    private List<UserXChampionDTO> buildListUserXChampionDTO
            (List<UserXChampionEntity> list, String errorMsg)
    {
        if (!list.isEmpty())
        {
            List<UserXChampionDTO> dtoList = new ArrayList<>();
            for (UserXChampionEntity u : list)
            {
                dtoList.add(buildUserXChampionDTO(u));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }
    private void verifyExistingRegister(UserEntity user, ChampionEntity champion) {
        Optional<UserXChampionEntity> opt =
                userXChampionRepository.findByUserAndChampion(user, champion);
        if (opt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User already owns this champion (userId: " + user.getId() +
                            ", championId: " + champion.getId() + ")");
        }
    }
}
