package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.association.UserXSkinDTO;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.domain.UserRepository;
import LoL_Client_Back.services.interfaces.assocation.UserXChampionService;
import LoL_Client_Back.services.interfaces.assocation.UserXSkinService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    UserXChampionRepository userXChampionRepository;

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

    @Override
    public String giveSkinsToUsersWithout() {

        List<UserEntity> usersWithoutSkins = userXSkinRepository.findUsersWithoutSkins();
        if (usersWithoutSkins.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There are no users with no skins");

        List<UserXSkinEntity> newBelongings = new ArrayList<>();
        Random random = new Random();

        for (UserEntity user : usersWithoutSkins)
        {
            List<UserXChampionEntity> userChampions =
                    userXChampionRepository.findByUser_Id(user.getId());

            if (userChampions == null || userChampions.isEmpty())
                throw new RuntimeException("The user "+ user.getId() + " has no champions to get skins");

            // Get champion list from userXchampions
            List<ChampionEntity> champions =
                    userChampions.stream()
                    .map(UserXChampionEntity::getChampion)
                    .collect(Collectors.toList());

            List<SkinEntity> availableSkins = skinRepository.findByChampionIn(champions);

            if (availableSkins == null || availableSkins.size() < 3) {
                continue; // if the champion does not have skins (should never happen)
            }

            Collections.shuffle(availableSkins, random);
            SkinEntity skin1 = availableSkins.get(0);
            SkinEntity skin2 = availableSkins.get(1);
            SkinEntity skin3 = availableSkins.get(2);

            UserXSkinEntity belonging1 = new UserXSkinEntity();
            belonging1.setUser(user);
            belonging1.setSkin(skin1);
            belonging1.setAdquisitionDate(LocalDateTime.now());

            UserXSkinEntity belonging2 = new UserXSkinEntity();
            belonging2.setUser(user);
            belonging2.setSkin(skin2);
            belonging2.setAdquisitionDate(LocalDateTime.now());

            UserXSkinEntity belonging3 = new UserXSkinEntity();
            belonging3.setUser(user);
            belonging3.setSkin(skin3);
            belonging3.setAdquisitionDate(LocalDateTime.now());

            newBelongings.add(belonging1);
            newBelongings.add(belonging2);
            newBelongings.add(belonging3);
        }

        userXSkinRepository.saveAll(newBelongings);
        return "Skins were assigned to " + usersWithoutSkins.size() + " users.";
    }

    @Transactional
    @Override
    public UserXSkinDTO unlockSkin(Long idUser, Long idSkin) {

        UserEntity user = userRepository.findById(idUser)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find user with id " + idUser));

        SkinEntity skin = skinRepository.findById(idSkin)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find skin with id " + idSkin));

        verifyChampionBelonging(idUser, skin.getChampion().getId());

        verifyExistingRegister(user, skin);

        Integer skinCost = skin.getTier().getRpCost();
        Integer userRiotPoints = user.getRiotPoints();

        if (userRiotPoints < skinCost) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user does not have enough Riot Points to buy this skin");
        }

        user.setRiotPoints(userRiotPoints - skinCost);
        userRepository.save(user);

        UserXSkinEntity userXSkin = new UserXSkinEntity();
        userXSkin.setUser(user);
        userXSkin.setSkin(skin);
        userXSkin.setAdquisitionDate(LocalDateTime.now());

        return dtoBuilder.buildUserXSkinDTO(userXSkinRepository.save(userXSkin));
    }

    @Transactional
    @Override
    public void unlockAllSkins(Long idUser) {
        UserEntity user = userRepository.findById(idUser)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "User id " + idUser + " does not exist"));

        // Campeones que posee el usuario
        List<UserXChampionEntity> userXChampionEntities = userXChampionRepository.findByUser_Id(idUser);
        List<Long> championsOwnedIds = userXChampionEntities.stream()
                .map(x -> x.getChampion().getId())
                .toList();

        if (championsOwnedIds.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user does not own any champions, so no skins can be unlocked");
        }

        // Skins que el usuario ya tiene
        List<UserXSkinEntity> userOwnedSkins = userXSkinRepository.findByUser_Id(idUser);
        Set<Long> ownedSkinIds = userOwnedSkins.stream()
                .map(s -> s.getSkin().getId())
                .collect(Collectors.toSet());

        // Skins de los campeones que posee el usuario
        List<SkinEntity> availableSkins = skinRepository.findByChampion_IdIn(championsOwnedIds);

        for (SkinEntity skin : availableSkins) {
            if (!ownedSkinIds.contains(skin.getId())) {
                UserXSkinEntity newUserSkin = new UserXSkinEntity();
                newUserSkin.setUser(user);
                newUserSkin.setSkin(skin);
                newUserSkin.setAdquisitionDate(LocalDateTime.now());
                userXSkinRepository.save(newUserSkin);
            }
        }
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
