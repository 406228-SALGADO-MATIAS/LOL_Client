package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.association.UserXIconDTO;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXIconService;
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
public class UserXIconServiceImpl implements UserXIconService {
    @Autowired
    private UserXIconRepository userXIconRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileIconRepository iconRepository;

    @Autowired
    @Qualifier("customModelMapper")
    private ModelMapper customMapper;

    @Override
    public UserXIconDTO findById(Long id) {
        Optional<UserXIconEntity> opt = userXIconRepository.findById(id);
        if (opt.isPresent()) {
            return buildUserXIconDTO(opt.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find icon belonging with id " + id);
    }

    @Override
    public List<UserXIconDTO> getAll() {
        return buildListUserXIconDTO(userXIconRepository.findAll(),
                "Did not find any icon belongings");
    }

    @Override
    public List<UserXIconDTO> findByIconId(Long id) {
        return buildListUserXIconDTO(userXIconRepository.findByIcon_Id(id),
                "Did not find any icon belongings for the icon id " + id);
    }

    @Override
    public List<UserXIconDTO> findByUserId(Long id) {
        return buildListUserXIconDTO(userXIconRepository.findByUser_Id(id),
                "Did not find any icon belongings for the user id " + id);
    }

    @Override
    public UserXIconDTO findByUserAndIcon(Long iconId, Long userId) {
        Optional<ProfileIconEntity> i = iconRepository.findById(iconId);
        Optional<UserEntity> u = userRepository.findById(userId);

        if (i.isPresent()) {
            if (u.isPresent()) {
                Optional<UserXIconEntity> opt = userXIconRepository.
                        findByUserAndIcon(u.get(), i.get());
                if (opt.isPresent()) {
                    return buildUserXIconDTO(opt.get());
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "The user with id " + userId + ", nicknamed " + u.get().getNickname() +
                                " does not have the icon (id " + iconId + ")");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find user with id " + userId);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find icon with id " + iconId);
    }

    @Override
    public void deleteById(Long id) {
        Optional<UserXIconEntity> opt = userXIconRepository.findById(id);
        if (opt.isPresent()) {
            userXIconRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find icon belonging with id " + id);
        }
    }

    @Override
    public UserXIconDTO createIconBelonging(Long idUser, Long idIcon) {
        Optional<ProfileIconEntity> i = iconRepository.findById(idIcon);
        Optional<UserEntity> u = userRepository.findById(idUser);

        if (u.isPresent()) {
            if (i.isPresent()) {
                verifyExistingRegister(u.get(), i.get());

                UserXIconEntity entity = new UserXIconEntity();
                entity.setIcon(i.get());
                entity.setUser(u.get());
                entity.setAdquisitionDate(LocalDateTime.now());
                return buildUserXIconDTO(userXIconRepository.save(entity));
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find icon with id " + idIcon);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find user with id " + idUser);
    }

    @Override
    public UserXIconDTO updateIconBelonging(Long idBelonging, Long idUser, Long idIcon) {
        Optional<UserXIconEntity> uxi = userXIconRepository.findById(idBelonging);
        if (uxi.isPresent()) {
            Optional<UserEntity> u = userRepository.findById(idUser);
            if (u.isPresent()) {
                Optional<ProfileIconEntity> i = iconRepository.findById(idIcon);
                if (i.isPresent()) {
                    verifyExistingRegister(u.get(), i.get());

                    UserXIconEntity updated = uxi.get();
                    updated.setAdquisitionDate(LocalDateTime.now());
                    updated.setUser(u.get());
                    updated.setIcon(i.get());
                    return buildUserXIconDTO(userXIconRepository.save(updated));
                }
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Did not find icon with id " + idIcon + " to update");
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find user with id " + idUser + " to update");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find icon belonging with id " + idBelonging + " to update");
    }

    private UserXIconDTO buildUserXIconDTO(UserXIconEntity entity) {
        UserXIconDTO dto = customMapper.map(entity, UserXIconDTO.class);
        dto.setId(entity.getId());
        dto.setIdIcon(entity.getIcon().getId());
        dto.setIcon(entity.getIcon().getIcon());
        dto.setIdUser(entity.getUser().getId());
        dto.setNickname(entity.getUser().getNickname());

        if (entity.getUser().getServer() != null) {
            dto.setServer(entity.getUser().getServer().getServer());
        }
        if (entity.getUser().getRank() != null) {
            dto.setRank(entity.getUser().getRank().getRank());
        }

        return dto;
    }

    private List<UserXIconDTO> buildListUserXIconDTO(List<UserXIconEntity> list, String errorMsg) {
        if (!list.isEmpty()) {
            List<UserXIconDTO> dtoList = new ArrayList<>();
            for (UserXIconEntity u : list) {
                dtoList.add(buildUserXIconDTO(u));
            }
            return dtoList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, errorMsg);
    }

    private void verifyExistingRegister(UserEntity user, ProfileIconEntity icon) {
        Optional<UserXIconEntity> opt = userXIconRepository.findByUserAndIcon(user, icon);
        if (opt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User already owns this icon (userId: " + user.getId()
                            + ", iconId: " + icon.getId() + ")");
        }
    }
}
