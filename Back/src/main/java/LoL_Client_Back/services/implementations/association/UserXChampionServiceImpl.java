package LoL_Client_Back.services.implementations.association;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.UpdateStatementDTO;
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
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

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
    @Autowired
    DTOBuilder dtoBuilder;

    @Override
    public UserXChampionDTO findById(Long id) {
        Optional<UserXChampionEntity> optional =
                userXChampionRepository.findById(id);
        if (optional.isPresent())
        {
            return dtoBuilder.buildUserXChampionDTO(optional.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion belonging with id "+id);
    }

    @Override
    public List<UserXChampionDTO> getAll() {
        return dtoBuilder.buildListUserXChampionDTO(userXChampionRepository.findAll(),
                "Did not find any champion belongings");
    }

    @Override
    public List<UserXChampionDTO> findByChampionId(Long id) {
        return dtoBuilder.buildListUserXChampionDTO(userXChampionRepository.findByChampion_Id(id),
                "Did not find any champion belongings for the champion id "+id);
    }

    @Override
    public List<UserXChampionDTO> findByUserId(Long id) {
        return dtoBuilder.buildListUserXChampionDTO(userXChampionRepository.findByUser_Id(id),
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
                    return dtoBuilder.buildUserXChampionDTO(opt.get());
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
                return dtoBuilder.buildUserXChampionDTO(userXChampionRepository.save(entity));
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
                    return dtoBuilder.buildUserXChampionDTO(userXChampionRepository.save(updated));
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

    @Override
    public String giveChampionsToUsersWithNoChampions()
    {
        List<UserEntity> usersWithoutChampions = userXChampionRepository.findUsersWithoutChampions();

        if (usersWithoutChampions.isEmpty()) {
            return "There are no users with no champions";
        }

        List<ChampionEntity> championsTop = championRepository.findByRole_id(1L);
        List<ChampionEntity> championsJg = championRepository.findByRole_id(2L);
        List<ChampionEntity> championsMid = championRepository.findByRole_id(3L);
        List<ChampionEntity> championsAdc = championRepository.findByRole_id(4L);
        List<ChampionEntity> championsSupport = championRepository.findByRole_id(5L);

        List<UserXChampionEntity> newBelongings = new ArrayList<>();
        Random random = new Random();

        for (UserEntity u : usersWithoutChampions)
        {
            UserXChampionEntity topPick = new UserXChampionEntity();
            topPick.setUser(u);
            topPick.setChampion(randomFrom(championsTop, random));
            topPick.setMasteryLevel(0);
            topPick.setAdquisitionDate(LocalDateTime.now());
            newBelongings.add(topPick);

            UserXChampionEntity jgPick = new UserXChampionEntity();
            jgPick.setUser(u);
            jgPick.setChampion(randomFrom(championsJg, random));
            jgPick.setMasteryLevel(0);
            jgPick.setAdquisitionDate(LocalDateTime.now());
            newBelongings.add(jgPick);

            UserXChampionEntity midPick = new UserXChampionEntity();
            midPick.setUser(u);
            midPick.setChampion(randomFrom(championsMid, random));
            midPick.setMasteryLevel(0);
            midPick.setAdquisitionDate(LocalDateTime.now());
            newBelongings.add(midPick);

            UserXChampionEntity adcPick = new UserXChampionEntity();
            adcPick.setUser(u);
            adcPick.setChampion(randomFrom(championsAdc, random));
            adcPick.setMasteryLevel(0);
            adcPick.setAdquisitionDate(LocalDateTime.now());
            newBelongings.add(adcPick);

            UserXChampionEntity supportPick = new UserXChampionEntity();
            supportPick.setUser(u);
            supportPick.setChampion(randomFrom(championsSupport, random));
            supportPick.setMasteryLevel(0);
            supportPick.setAdquisitionDate(LocalDateTime.now());
            newBelongings.add(supportPick);
        }

        userXChampionRepository.saveAll(newBelongings);

        return "Champions were assigned to " + usersWithoutChampions.size() + " users.";

    }

    @Transactional
    @Override
    public UserXChampionDTO unlockChampion(Long idUser, Long idChampion) {
        UserEntity user = userRepository.findById(idUser)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find user with id " + idUser));

        ChampionEntity champion = championRepository.findById(idChampion)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find champion with id " + idChampion));

        verifyExistingRegister(user, champion);

        int championCost = champion.getPrice().getBlueEssenceCost();
        int userBlueEssence = user.getBlueEssence();

        if (userBlueEssence < championCost) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The user does not have enough blue essence to buy this champion");
        }

        user.setBlueEssence(userBlueEssence - championCost);
        userRepository.save(user);

        UserXChampionEntity userXChampion = new UserXChampionEntity();
        userXChampion.setUser(user);
        userXChampion.setChampion(champion);
        userXChampion.setMasteryLevel(0);
        userXChampion.setAdquisitionDate(LocalDateTime.now());

        return dtoBuilder.buildUserXChampionDTO(userXChampionRepository.save(userXChampion));
    }

    @Override
    public List<UpdateStatementDTO> updateUserProfiles() {
        List<UserEntity> userEntities = userRepository.findAll();
        if (userEntities.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"There are no users in the db");
        }
        List<UpdateStatementDTO> dtos = new ArrayList<>();
        for (UserEntity user : userEntities)
        {
            List<UserXChampionEntity> userXChampionEntities =
                    userXChampionRepository.findByUser_Id(user.getId());

            Collections.shuffle(userXChampionEntities);
            ChampionEntity champion = userXChampionEntities.get(0).getChampion();

            String imageUrl = champion.getImage().replace("'", "''");
            String sql = "UPDATE users SET background_image = '" + imageUrl + "' WHERE id = " + user.getId();

            UpdateStatementDTO dto = new UpdateStatementDTO();
            dto.setStatement(sql);
            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    public void unlockAllChampions(Long idUser) {

        Optional<UserEntity> optionalUser = userRepository.findById(idUser);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id "+idUser + " does not exists");
        List<UserXChampionEntity> userXChampionEntities = userXChampionRepository.findByUser_Id(idUser);
        List<Long> championsOwnedIds = new ArrayList<>();
        for (UserXChampionEntity x : userXChampionEntities)
        {
            championsOwnedIds.add(x.getChampion().getId());
        }
        List<ChampionEntity> championsToUnlock = championRepository.findByIdNotIn(championsOwnedIds);
        for (ChampionEntity c : championsToUnlock)
        {
            UserXChampionEntity x = new UserXChampionEntity();
            x.setUser(optionalUser.get());
            x.setChampion(c);
            userXChampionRepository.save(x);
        }
    }


    private ChampionEntity randomFrom(List<ChampionEntity> list, Random random) {
        return list.get(random.nextInt(list.size()));
    }

    public void verifyExistingRegister(UserEntity user, ChampionEntity champion) {
        Optional<UserXChampionEntity> opt =
                userXChampionRepository.findByUserAndChampion(user, champion);
        if (opt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User already owns this champion (userId: " + user.getId() +
                            ", championId: " + champion.getId() + ")");
        }
    }
}
