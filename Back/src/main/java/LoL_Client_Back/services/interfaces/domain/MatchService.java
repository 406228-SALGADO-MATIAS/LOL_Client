package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.match.MatchDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MatchService {
    MatchDTO createMatch(ServerOption serverOption, String gameMode, String map, String elo);
}
