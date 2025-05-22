package LoL_Client_Back.services.implementations.domain;

import LoL_Client_Back.dtos.SkinDTO;
import LoL_Client_Back.dtos.enums.Champion;
import LoL_Client_Back.entities.domain.ChampionEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.reference.SkinTierEntity;
import LoL_Client_Back.repositories.domain.ChampionRepository;
import LoL_Client_Back.repositories.domain.SkinRepository;
import LoL_Client_Back.repositories.reference.SkinTierRepository;
import LoL_Client_Back.services.interfaces.domain.SkinService;
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
public class SkinServiceImpl implements SkinService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    @Qualifier("customModelMapper")
    ModelMapper customMapper;
    @Autowired
    SkinRepository skinRepository;
    @Autowired
    ChampionRepository championRepository;
    @Autowired
    SkinTierRepository skinTierRepository;

    @Override
    public List<SkinDTO> getAllSkins() {
        return buildSkinDTOList(skinRepository.findAll(),
                "Did not find any skins in the database");
    }

    @Override
    public List<SkinDTO> findSkinsByChampionName(Champion championName) {
        return buildSkinDTOList(skinRepository.findByChampion_Name(championName.getDisplayName()),
                "Did not find skins for the champion "+championName.getDisplayName());
    }

    @Override
    public List<SkinDTO> findSkinsByRpCost(String filter, Integer rpCost) {
        if (filter.equals("GREATER")) {
            return buildSkinDTOList(skinRepository.
                    findByTier_RpCostGreaterThanEqualOrderByTier_RpCostAsc(rpCost),
                    "Did not find skins with rp cost higher than "+rpCost);
        }
        if (filter.equals("LESSER")) {
            return buildSkinDTOList(skinRepository.
                            findByTier_RpCostLessThanEqualOrderByTier_RpCostDesc(rpCost),
                    "Did not find skins with rp cost lesser than "+rpCost);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,"Bad filter '"+filter+"'");
    }

    @Override
    public List<SkinDTO> findSkinsByName(String name) {
        return buildSkinDTOList(skinRepository.findByNameIgnoreCaseContaining(name),
                "Did not find skins named like'"+name+"'");
    }

    @Override
    public SkinDTO getSkinById(Long id) {
        Optional<SkinEntity> skinEntityOptional = skinRepository.findById(id);
        if (skinEntityOptional.isPresent()) return buildSkinDTO(skinEntityOptional.get());
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find skin with id "+id);
    }

    @Override
    public List<SkinDTO> findSkinsByChampionId(Long id) {
        return buildSkinDTOList(skinRepository.findByChampion_Id(id),
                "Did not find skins for the champion id "+id);
    }

    @Override
    public SkinDTO createSkin(String name, Long championId, String imageUrl, Integer rpCost) {

        SkinEntity s = getSkinWithChampionAndTierOnly(championId,rpCost);
        s.setName(name);
        s.setImage(imageUrl);
        s.setReleaseDate(LocalDate.now());
        return buildSkinDTO(skinRepository.save(s));
    }

    @Override
    public SkinDTO updateSkin(Long skinId, String name, Long championId, String imageUrl, Integer rpCost) {
        Optional<SkinEntity> optional =
                skinRepository.findById(skinId);
        if (optional.isPresent()) {
            SkinEntity s = getSkinWithChampionAndTierOnly(championId,rpCost);
            s.setId(skinId);
            s.setName(name);
            s.setImage(imageUrl);
            s.setReleaseDate(LocalDate.now());
            return buildSkinDTO(skinRepository.save(s));
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Did not find skin with id "+skinId + " to update");
    }

    @Override
    public void deleteSkin(Long id) {
        skinRepository.delete(
                skinRepository.findById(id).orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Did not find skin with id to delete")));
    }

    public SkinEntity getSkinWithChampionAndTierOnly(Long championId, Integer rpCost) {
        ChampionEntity champion = championRepository.findById(championId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find champion id " + championId));

        SkinTierEntity tier = skinTierRepository.findByRpCost(rpCost)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Did not find skin tier for the rpCost " + rpCost));

        SkinEntity skin = new SkinEntity();
        skin.setChampion(champion);
        skin.setTier(tier);
        return skin;
    }


    private SkinDTO buildSkinDTO (SkinEntity s) {
        SkinDTO dto = customMapper.map(s,SkinDTO.class);
        dto.setChampionName(s.getChampion().getName());
        dto.setRpCost(s.getTier().getRpCost());
        dto.setOrangeEssenceCost(s.getTier().getOrangeEssenceCost());
        return dto;
    }

    private List<SkinDTO> buildSkinDTOList (List<SkinEntity> list, String errorMsg) {
        if (!list.isEmpty()) {
            List<SkinDTO> dtos = new ArrayList<>();
            for (SkinEntity s : list) {
                dtos.add(buildSkinDTO(s));
            }
            return dtos;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,errorMsg);
    }

}
