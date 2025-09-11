package LoL_Client_Back.services.interfaces.reference;

import LoL_Client_Back.entities.reference.RankTierEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RankTierService {
    List<RankTierEntity> getAll();
}
