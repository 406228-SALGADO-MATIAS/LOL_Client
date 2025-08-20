package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.association.UserXIconDTO;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXIconService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

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

    @Autowired
    DTOBuilder dtoBuilder;

    @Override
    public UserXIconDTO findById(Long id) {
        Optional<UserXIconEntity> opt = userXIconRepository.findById(id);
        if (opt.isPresent()) {
            return dtoBuilder.buildUserXIconDTO(opt.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find icon belonging with id " + id);
    }

    @Override
    public List<UserXIconDTO> getAll() {
        return dtoBuilder.buildListUserXIconDTO(userXIconRepository.findAll(),
                "Did not find any icon belongings");
    }

    @Override
    public List<UserXIconDTO> findByIconId(Long id) {
        return dtoBuilder.buildListUserXIconDTO(userXIconRepository.findByIcon_Id(id),
                "Did not find any icon belongings for the icon id " + id);
    }

    @Override
    public List<UserXIconDTO> findByUserId(Long id) {
        return dtoBuilder.buildListUserXIconDTO(userXIconRepository.findByUser_Id(id),
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
                    return dtoBuilder.buildUserXIconDTO(opt.get());
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
                return dtoBuilder.buildUserXIconDTO(userXIconRepository.save(entity));
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
                    return dtoBuilder.buildUserXIconDTO(userXIconRepository.save(updated));
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

    @Override
    public String giveIconsToAllUsers() {
        List<UserEntity> users =
                userRepository.findAll();
        if (users.isEmpty())
            throw new ResponseStatusException
                    (HttpStatus.NOT_FOUND,"There are no users in the database to give icons");
        List<UserXIconEntity> newBelongings = new ArrayList<>();
        for (UserEntity user : users)
        {
             List<ProfileIconEntity> iconsAvailable =
                     userXIconRepository.findIconsNotOwnedByUser(user.getId());

            Collections.shuffle(iconsAvailable);

            int count = 0;
            while (count < 4 && !iconsAvailable.isEmpty()) {
                ProfileIconEntity selectedIcon = iconsAvailable.remove(0);

                UserXIconEntity belonging = new UserXIconEntity();
                belonging.setUser(user);
                belonging.setIcon(selectedIcon);
                belonging.setAdquisitionDate(LocalDateTime.now());

                newBelongings.add(belonging);
                count++;
            }
        }
        userXIconRepository.saveAll(newBelongings);
        return "Successfully added icons to all players ("+ users.size() + ")";
    }

    @Transactional
    @Override
    public UserXIconDTO unlockIcon(Long idUser, Long idIcon) {

        UserEntity user = userRepository.findById(idUser)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find user with id " + idUser));

        ProfileIconEntity icon = iconRepository.findById(idIcon)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find icon with id " + idIcon));

        verifyExistingRegister(user, icon);

        Integer iconCost = icon.getPrice().getBlueEssenceCost();
        Integer userBlueEssence = user.getBlueEssence();

        if (userBlueEssence < iconCost) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user does not have enough Riot Points to buy this icon");
        }

        user.setBlueEssence(userBlueEssence - iconCost);
        userRepository.save(user);

        UserXIconEntity userXIcon = new UserXIconEntity();
        userXIcon.setUser(user);
        userXIcon.setIcon(icon);
        userXIcon.setAdquisitionDate(LocalDateTime.now());

        return dtoBuilder.buildUserXIconDTO(userXIconRepository.save(userXIcon));
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
