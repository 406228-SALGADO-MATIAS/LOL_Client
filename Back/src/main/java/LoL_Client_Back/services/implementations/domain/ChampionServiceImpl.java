package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.DTOBuilder;
import LoL_Client_Back.dtos.champion.ChampionDTO;
import LoL_Client_Back.dtos.enums.ChampionDifficulty;
import LoL_Client_Back.dtos.enums.ChampionRole;
import LoL_Client_Back.dtos.enums.ChampionStyle;
import LoL_Client_Back.entities.association.UserXChampionEntity;
import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.MatchEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.reference.ChampionDifficultyEntity;
import LoL_Client_Back.entities.reference.ChampionStyleEntity;
import LoL_Client_Back.entities.reference.ChampionTierPriceEntity;
import LoL_Client_Back.entities.reference.RoleEntity;
import LoL_Client_Back.entities.transaction.LootInventoryChampionsEntity;
import LoL_Client_Back.entities.transaction.LootInventorySkinsEntity;
import LoL_Client_Back.models.domain.Champion;
import LoL_Client_Back.repositories.association.UserXChampionRepository;
import LoL_Client_Back.repositories.association.UserXSkinRepository;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.MatchRepository;
import LoL_Client_Back.repositories.domain.PlayerMatchDetailRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.reference.*;
import LoL_Client_Back.repositories.transaction.LootInventoryChampionsRepository;
import LoL_Client_Back.repositories.transaction.LootInventorySkinsRepository;
import LoL_Client_Back.services.interfaces.domain.ChampionService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChampionServiceImpl implements ChampionService {

    @Autowired
    ChampionRepository championRepository;
    @Autowired
    ChampionDifficultyRepository difficultyRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    ChampionStyleRepository championStyleRepository;
    @Autowired
    ChampionTierPriceRepository tierPriceRepository;
    @Autowired
    UserXChampionRepository userXChampionRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    @Qualifier("customModelMapper")
    private ModelMapper customMapper;
    @Autowired
    LootInventoryChampionsRepository lootInventoryChampionsRepository;
    @Autowired
    LootInventorySkinsRepository lootInventorySkinsRepository;
    @Autowired
    UserXSkinRepository userXSkinRepository;
    @Autowired
    SkinRepository skinRepository;
    @Autowired
    MatchRepository matchRepository;
    @Autowired
    PlayerMatchDetailRepository matchDetailRepository;
    @Autowired
    DTOBuilder dtoBuilder;


    @Override
    public List<ChampionDTO> getAllChampions() {
        return dtoBuilder.buildChampionDTOList(championRepository.findAll(),
                "Did not find any champions");
    }

    @Override
    public List<ChampionDTO> findChampionsByName(String name) {
        return dtoBuilder.buildChampionDTOList(championRepository.findByNameIgnoreCaseContaining(name),
                "Did not find champions named "+name);
    }

    @Override
    public List<ChampionDTO> findChampionsByDifficulty(ChampionDifficulty difficulty) {
        return dtoBuilder.buildChampionDTOList(championRepository.findByDifficulty(getChampionDifficulty(difficulty.name())),
                "Did not find champions with difficulty "+difficulty);
    }

    @Override
    public List<ChampionDTO> findChampionsByRole(ChampionRole championRole) {
        RoleEntity rol = getChampionRole(championRole.name());
        return dtoBuilder.buildChampionDTOList(championRepository.findByRoleOrRole2(rol,rol),
                "Did no find champions with main rol or side rol to be "+championRole.name());
    }

    @Override
    public List<ChampionDTO> findByRoleOrRole2AndStyleOrStyle2(ChampionRole role, ChampionStyle style) {
        RoleEntity r = getChampionRole(role.name());
        ChampionStyleEntity s = getChampionStyle(style.name());
        return dtoBuilder.buildChampionDTOList(championRepository.
                        findByRoleOrRole2AndStyleOrStyle2(r,r,s,s)
        ,"Did not find champions with any rol as "+role.name() + "and any style as "+style.name());
    }

    @Override
    public List<ChampionDTO> findByRoleAndStyleOrStyle2(ChampionRole role, ChampionStyle style) {
        RoleEntity r = getChampionRole(role.name());
        ChampionStyleEntity s = getChampionStyle(style.name());
        return dtoBuilder.buildChampionDTOList(championRepository.findByRoleAndStyleOrRoleAndStyle2(r,s,r,s),
                "Did not find champions with main rol "+role.name()+" and any style as "+style.name());
    }

    @Override
    public List<ChampionDTO> findByMainRole(ChampionRole role) {
        RoleEntity r = getChampionRole(role.name());
        return dtoBuilder.buildChampionDTOList(championRepository.findByRole(r),
                "Did not find champions with main role "+role.name());
    }

    @Override
    public List<ChampionDTO> findByMainStyle(ChampionStyle style) {
        ChampionStyleEntity s = getChampionStyle(style.name());
        return dtoBuilder.buildChampionDTOList(championRepository.findByStyle(s),
                "Did not find champions with main style "+style.name());
    }

    @Override
    public List<ChampionDTO> findByStyle(ChampionStyle style) {
        ChampionStyleEntity s = getChampionStyle(style.name());
        return dtoBuilder.buildChampionDTOList(championRepository.findByStyleOrStyle2(s,s),
                "Did not find champions with any style"+style.name());
    }

    @Override
    public List<ChampionDTO> findByDate(LocalDate date, String filter) {
        if (filter.equals("AFTER"))
        {
            return dtoBuilder.buildChampionDTOList(championRepository.findByReleaseDateAfterOrderByReleaseDateAsc(date),
                    "Did not find champions which release date is after the date "+date);
        }
        if (filter.equals("BEFORE"))
        {
            return dtoBuilder.buildChampionDTOList(championRepository.findByReleaseDateBeforeOrderByReleaseDateDesc(date),
                    "Did not find champions which release date is before the date "+date);
        }
        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,"Invalid filter "+filter);
    }

    @Override
    public List<ChampionDTO> findByWinrate(Double winrate, String filter) {
        if (filter.equals("GREATER")) {
            return dtoBuilder.buildChampionDTOList(
                    championRepository.findByWinrateGreaterThanEqualOrderByWinrateAsc(winrate),
                    "No champions found with winrate greater than " + winrate
            );
        }
        if (filter.equals("LESSER")) {
            return dtoBuilder.buildChampionDTOList(
                    championRepository.findByWinrateLessThanEqualOrderByWinrateDesc(winrate),
                    "No champions found with winrate less than " + winrate
            );
        }
        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Invalid filter: " + filter);
    }

    @Override
    public List<ChampionDTO> findByBlueEssenceCost(Integer cost, String filter) {
        if (filter.equals("HIGHER")) {
            return dtoBuilder.buildChampionDTOList(
                    championRepository.findByPrice_BlueEssenceCostGreaterThanEqualOrderByPrice_BlueEssenceCostAsc(cost),
                    "No champions found with blue essence cost greater than or equal to " + cost
            );
        }
        if (filter.equals("LESSER")) {
            return dtoBuilder.buildChampionDTOList(
                    championRepository.findByPrice_BlueEssenceCostLessThanEqualOrderByPrice_BlueEssenceCostDesc(cost),
                    "No champions found with blue essence cost less than or equal to " + cost
            );
        }
        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Invalid filter: " + filter);
    }

    @Override
    public ChampionDTO getById(Long id) {
        Optional<ChampionEntity> entity =
                championRepository.findById(id);
        if (entity.isPresent())
        {
            return dtoBuilder.buildChampionDTO(entity.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Did not find champion with id " + id );
    }

    @Override
    public ChampionDTO putChampion(Long id, String name, Double winrate, Integer price,
                                   ChampionDifficulty difficulty,
                                   ChampionRole role, ChampionRole role2,
                                   ChampionStyle style, ChampionStyle style2) {
        Optional<ChampionEntity> c = championRepository.findById(id);
        if (c.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Did not find champion with id " + id + " to edit");
        }
        Optional<ChampionEntity> e =
                championRepository.findByNameIgnoreCase(name);
        if (e.isEmpty())
        {
            ChampionEntity champion = c.get();

            champion.setReleaseDate(LocalDate.now());

            if (name != null) {
                champion.setName(name);
            }
            if (winrate != null) {
                champion.setWinrate(winrate);
            }
            if (difficulty != null) {
                ChampionDifficultyEntity d = getChampionDifficulty(difficulty.name());
                champion.setDifficulty(d);
            }

            champion.setStyle(style != null ? getChampionStyle(style.name()) : null);
            champion.setStyle2(style2 != null ? getChampionStyle(style2.name()) : null);

            if (price != null) {
                ChampionTierPriceEntity p = getPriceOrThrow(price);
                champion.setPrice(p);
            }

            champion.setRole(role != null ? getChampionRole(role.name()) : null);
            champion.setRole2(role2 != null ? getChampionRole(role2.name()) : null);

            return dtoBuilder.buildChampionDTO(championRepository.save(champion));
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,
                "There is already a champion named "+name + " in the database. Try another name");
    }

    @Transactional
    @Override
    public String deleteChampion(Long id) {
        Optional<ChampionEntity> entity =
                championRepository.findById(id);
        if (entity.isPresent())
        {
            //CHAMPION
            List<UserXChampionEntity> belongingsChamps = userXChampionRepository.findByChampion_Id(id);
            userXChampionRepository.deleteAll(belongingsChamps);

            List<LootInventoryChampionsEntity> loots =
                    lootInventoryChampionsRepository.findByChampion(entity.get());
            lootInventoryChampionsRepository.deleteAll(loots);

            //DELETE SKINS

            List<SkinEntity> championSkins =  skinRepository.findByChampion_Id(id);

            for (SkinEntity s : championSkins) //for each skin
            {
                //look belongings with that skin
                //so the users will no longer have that skin
                List<UserXSkinEntity> belongings =
                        userXSkinRepository.findBySkin_Id(s.getId());
                userXSkinRepository.deleteAll(belongings);

                //look inventories with that skin
                //users will no longer have that skin on their loots
                List<LootInventorySkinsEntity> loot =
                        lootInventorySkinsRepository.findBySkin(s);
                lootInventorySkinsRepository.deleteAll(loot);

                skinRepository.delete(s); //delete the skin
            }

            List<MatchEntity> matches = //delete all matches with the champion
                    matchDetailRepository.findMatchesByChampionId(entity.get().getId());

            if (!matches.isEmpty())
                matchRepository.deleteAll(matches);

            championRepository.delete(entity.get());
            return "The champion named "+entity.get().getName() +" with id "+ id+" was successfully deleted";
        }
        return "Did not find champion with id "+id;
    }

    @Override
    public Champion createChampion(String name, Double winrate, String imageUrl, Integer price,
                                   ChampionDifficulty difficulty,
                                   ChampionRole role, ChampionRole role2,
                                   ChampionStyle style, ChampionStyle style2)
    {
        if (name != null)
        {
            Optional<ChampionEntity> e =
                    championRepository.findByNameIgnoreCase(name);
            if (e.isEmpty())
            {
                ChampionEntity c = new ChampionEntity();
                c.setName(name);
                c.setWinrate(winrate != null ? winrate : 0);
                c.setPrice(getPriceOrThrow(price));
                c.setDifficulty(getChampionDifficulty(difficulty.name()));
                c.setRole(role != null ? getChampionRole(role.name()) : null);
                c.setRole2(role2 != null ? getChampionRole(role2.name()) : null);
                c.setStyle(style != null ? getChampionStyle(style.name()) : null);
                c.setStyle2(style2 != null ? getChampionStyle(style2.name()) : null);
                c.setReleaseDate(LocalDate.now());
                c.setImage(imageUrl);

                return modelMapper.map(championRepository.save(c),Champion.class);
            }
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "There is already a champion named "+name + " in the database. Try another name");
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,
                "You must enter a name for the champion");
    }

    @Override
    public List<ChampionDTO> getUserChampions(Long idUser) {
       List<UserXChampionEntity> list = userXChampionRepository.findByUser_Id(idUser);
       if (!list.isEmpty()) {
           List<ChampionDTO> championList = new ArrayList<>();
           for (UserXChampionEntity u : list) {
               championList.add(dtoBuilder.buildChampionDTO(u.getChampion()));
           }
           return championList;
       }
       throw new ResponseStatusException(HttpStatus.NOT_FOUND,
               "The user with id "+idUser +" does not have any champions");
    }

    @Override
    public List<ChampionDTO> getUserChampionsNotPossess(Long idUser) {
        List<Long> championsOwnedIds = new ArrayList<>();

        //Champions he has
        List<UserXChampionEntity> championBelongings =
                userXChampionRepository.findByUser_Id(idUser);
        if (!championBelongings.isEmpty()) {

            for (UserXChampionEntity u : championBelongings) {
               championsOwnedIds.add(u.getChampion().getId());
            }

            return dtoBuilder.buildChampionDTOList(championRepository.findByIdNotIn(championsOwnedIds),
                    "The user has all the champions, " +
                            "there are no champions available for acquisition");
        }
        return dtoBuilder.buildChampionDTOList
                (championRepository.findAll(),"There are no champions");
    }

    private ChampionTierPriceEntity getPriceOrThrow(Integer price) {
        return tierPriceRepository.findByBlueEssenceCost(price)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Price not found: " + price));
    }

    private ChampionStyleEntity getChampionStyle (String style)
    {
        Optional<ChampionStyleEntity> s =
                championStyleRepository.findByStyleIgnoreCase(style);
        if (s.isPresent())
        {
            return s.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find champion style "+style);
    }

    private RoleEntity getChampionRole (String role)
    {
        Optional<RoleEntity> r =
                roleRepository.findByRoleIgnoreCase(role);
        if (r.isPresent())
        {
            return r.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find role "+role);
    }

    private ChampionDifficultyEntity getChampionDifficulty (String difficulty)
    {
        Optional<ChampionDifficultyEntity> c =
                difficultyRepository.findByDifficultyIgnoreCase(difficulty);
        if (c.isPresent())
        {
            return c.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find difficulty "+difficulty);
    }


}
