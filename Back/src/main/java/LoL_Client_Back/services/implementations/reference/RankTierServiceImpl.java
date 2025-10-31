package LoL_Client_Back.services.implementations.reference;

import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.repositories.reference.RankTierRepository;
import LoL_Client_Back.services.interfaces.reference.RankTierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RankTierServiceImpl implements RankTierService {

    @Autowired
    RankTierRepository rankTierRepository;

    @Override
    public List<RankTierEntity> getAll() {
        return rankTierRepository.findAll();
    }
}
