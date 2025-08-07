package LoL_Client_Back.services.implementations.reference;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.reference.ProfileIconDTO;
import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.reference.ChampionTierPriceEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import LoL_Client_Back.entities.transaction.LootInventoryIconsEntity;
import LoL_Client_Back.repositories.association.UserXIconRepository;
import LoL_Client_Back.repositories.reference.ChampionTierPriceRepository;
import LoL_Client_Back.repositories.reference.ProfileIconRepository;
import LoL_Client_Back.repositories.transaction.LootInventoryIconsRepository;
import LoL_Client_Back.services.interfaces.reference.ProfileIconService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileIconServiceImpl implements ProfileIconService {

    @Autowired
    ProfileIconRepository repository;
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    ChampionTierPriceRepository tierPriceRepository;
    @Autowired
    UserXIconRepository userXIconRepository;
    @Autowired
    LootInventoryIconsRepository lootInventoryIconsRepository;
    @Autowired
    DTOBuilder dtoBuilder;

    @Override
    public ProfileIconDTO getById(Long id) {
        return dtoBuilder.buildIconDTO(null,repository.findById(id),
                "Did not find any icon with id "+id);
    }

    @Override
    public List<ProfileIconDTO> getAll() {
        return dtoBuilder.buildDtoList(repository.findAll(),
                "Did not find any profile icons");
    }

    @Override
    public List<ProfileIconDTO> findByName(String name) {
        return dtoBuilder.buildDtoList(repository.findByIconIgnoreCaseContaining(name),
                "Did not find any profile icons by the name "+name);
    }

    @Override
    public ProfileIconDTO createProfileIcon(String iconName, String imageUrl, Integer blueEssencePrice) {

        checkPreexistenceIconName(iconName,null);

        ProfileIconEntity icon = new ProfileIconEntity();
        icon.setIcon(iconName);
        icon.setImage(imageUrl);
        icon.setPrice(getPriceOrThrow(blueEssencePrice));

        return dtoBuilder.buildIconDTO(repository.save(icon), Optional.empty(),"");
    }

    @Override
    public ProfileIconDTO updateProfileIcon(Long id, String iconName, String imageUrl, Integer blueEssencePrice) {
        Optional<ProfileIconEntity> optional =
                repository.findById(id);
        if (optional.isPresent())
        {
            ProfileIconEntity update = optional.get();
            checkPreexistenceIconName(iconName,update);
            if (iconName != null) update.setIcon(iconName);
            if (imageUrl !=null) update.setImage(imageUrl);
            update.setPrice(getPriceOrThrow(blueEssencePrice));
            return dtoBuilder.buildIconDTO(update,Optional.empty(),"");
         }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find profile icon with id " + id);
    }

    @Transactional
    @Override
    public void deleteProfileIcon(Long id) {
        ProfileIconEntity icon = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find profile icon with id " + id));

        List<UserXIconEntity> listBelongings = userXIconRepository.findByIcon_Id(id);
        userXIconRepository.deleteAll(listBelongings);
        List<LootInventoryIconsEntity> listLoot = lootInventoryIconsRepository.findByIcon(icon);
        lootInventoryIconsRepository.deleteAll(listLoot);
        repository.delete(icon);
    }

    @Override
    public List<ProfileIconDTO> getUserIcons(Long idUser) {
        List<UserXIconEntity> ownership =
                userXIconRepository.findByUser_Id(idUser);
        if (!ownership.isEmpty()) {
            List<ProfileIconDTO> iconsList = new ArrayList<>();
            for (UserXIconEntity u : ownership) {
                iconsList.add(dtoBuilder.buildIconDTO
                        (u.getIcon(),Optional.empty(),""));
            }
            return iconsList;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"The user has not any icons in possession");
    }

    @Override
    public List<ProfileIconDTO> getUserIconsNotPossess(Long idUser) {
        List<Long> ownedIconsIds = new ArrayList<>();
        List<UserXIconEntity> ownershipList =
                userXIconRepository.findByUser_Id(idUser);

        String errorMsg = "The user hast not any icons in possession, " +
                "but there are no icons in the database";

        if (!ownershipList.isEmpty()){
            for (UserXIconEntity u : ownershipList){
                ownedIconsIds.add(u.getIcon().getId());
            }
            return dtoBuilder.buildDtoList(repository.findByIdNotIn(ownedIconsIds),errorMsg);
        }
        return dtoBuilder.buildDtoList(repository.findAll(),errorMsg);
    }

    private void checkPreexistenceIconName(String name, ProfileIconEntity iconToUpdate)
    {
        Optional<ProfileIconEntity> optional =
                repository.findByIconIgnoreCase(name);
        if (optional.isPresent()) {
            if (iconToUpdate != null) {
                if (!optional.get().getId().equals(iconToUpdate.getId())) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT,
                            "There is already an icon named "+name);
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "There is already an icon named "+name);
            }
        }
    }
    private ChampionTierPriceEntity getPriceOrThrow(Integer price) {
        return tierPriceRepository.findByBlueEssenceCost(price)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Price not found: " + price));
    }
}
