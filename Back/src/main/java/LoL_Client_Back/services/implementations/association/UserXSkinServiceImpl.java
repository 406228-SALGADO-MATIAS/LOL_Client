package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.association.UserXSkinDTO;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import LoL_Client_Back.services.interfaces.assocation.UserXSkinService;
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
public class UserXSkinServiceImpl implements UserXSkinService {
    @Autowired
    SkinRepository skinRepository;
    @Autowired
    UserXSkinRepository userXSkinRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    UserXChampionService userXChampionService;
    @Autowired
    DTOBuilder dtoBuilder;

    @Override
    public UserXSkinDTO findById(Long id) {
        Optional<UserXSkinEntity> optional = userXSkinRepository.findById(id);
        if (optional.isPresent()) {
            return dtoBuilder.buildUserXSkinDTO(optional.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find skin belonging with id " + id);
    }

    @Override
    public List<UserXSkinDTO> getAll() {
        return dtoBuilder.buildListUserXSkinDTO(userXSkinRepository.findAll(), "Did not find any skin belongings");
    }

    @Override
    public List<UserXSkinDTO> findBySkinId(Long id) {
        return dtoBuilder.buildListUserXSkinDTO(userXSkinRepository.findBySkin_Id(id),
                "Did not find any skin belongings for the skin id " + id);
    }

    @Override
    public List<UserXSkinDTO> findByUserId(Long id) {
        return dtoBuilder.buildListUserXSkinDTO(userXSkinRepository.findByUser_Id(id),
                "Did not find any skin belongings for the user id " + id);
    }

    @Override
    public UserXSkinDTO findByUserAndSkin(Long skinId, Long userId) {
        Optional<SkinEntity> s = skinRepository.findById(skinId);
        Optional<UserEntity> u = userRepository.findById(userId);
        if (s.isPresent()) {
            if (u.isPresent()) {
                Optional<UserXSkinEntity> opt = userXSkinRepository.findByUserAndSkin(u.get(), s.get());
                if (opt.isPresent()) {
                    return dtoBuilder.buildUserXSkinDTO(opt.get());
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "The user with id " + userId + ", nicknamed " + u.get().getNickname() +
                                " does not have the skin " + s.get().getName() + " (id " + skinId + ")");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find the user with id " + userId);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find the skin with id " + skinId);
    }

    @Override
    public void deleteById(Long id) {
        Optional<UserXSkinEntity> opt = userXSkinRepository.findById(id);
        if (opt.isPresent()) {
            userXSkinRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find skin belonging with id " + id);
        }
    }

    @Override
    public UserXSkinDTO createSkinBelonging(Long idUser, Long idSkin) {
        Optional<SkinEntity> s = skinRepository.findById(idSkin);
        Optional<UserEntity> u = userRepository.findById(idUser);
        if (u.isPresent()) {
            if (s.isPresent()) {

                //verifying that the user does have the champion before getting its skin
                verifyChampionBelonging(idUser,s.get().getChampion().getId());
                //verifying that the user does have the skin already
                verifyExistingRegister(u.get(),s.get());

                UserXSkinEntity entity = new UserXSkinEntity();
                entity.setSkin(s.get());
                entity.setUser(u.get());
                entity.setAdquisitionDate(LocalDateTime.now());
                return dtoBuilder.buildUserXSkinDTO(userXSkinRepository.save(entity));
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find skin with id " + idSkin);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Did not find user with id " + idUser);
    }

    @Override
    public UserXSkinDTO updateSkinBelongiong(Long idBelonging, Long idUser,
                                             Long idSkin) {
        Optional<UserXSkinEntity> uxs = userXSkinRepository.findById(idBelonging);
        if (uxs.isPresent()) {
            Optional<UserEntity> u = userRepository.findById(idUser);
            if (u.isPresent()) {
                Optional<SkinEntity> s = skinRepository.findById(idSkin);
                if (s.isPresent()) {

                    //verifying that the user does have the champion before getting its skin
                    verifyChampionBelonging(idUser,s.get().getChampion().getId());
                    //verifying that the user does have the skin already
                    verifyExistingRegister(u.get(),s.get());

                    UserXSkinEntity updated = uxs.get();
                    updated.setAdquisitionDate(LocalDateTime.now());
                    updated.setUser(u.get());
                    updated.setSkin(s.get());
                    return dtoBuilder.buildUserXSkinDTO(userXSkinRepository.save(updated));
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Did not find skin with id " + idSkin + " to update");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find user with id " + idUser + " to update");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find skin belonging with id " + idBelonging + " to update");
    }

    private void verifyChampionBelonging(Long idUser, Long idChampion) {
        try {
            userXChampionService.findByUserAndChampion(idChampion, idUser);
        } catch (ResponseStatusException ex) {
            if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "User must own the champion (id " + idChampion + ") before acquiring any of its skins.");
            }
            throw ex;
        }
    }
    private void verifyExistingRegister(UserEntity user, SkinEntity skin) {
        Optional<UserXSkinEntity> opt = userXSkinRepository.findByUserAndSkin(user, skin);
        if (opt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User already owns this skin (userId: " + user.getId() +
                            ", skinId: " + skin.getId() + ")");
        }
    }

}
