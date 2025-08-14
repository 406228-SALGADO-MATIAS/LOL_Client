package LoL_Client_Back.services.interfaces.domain;

import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.dtos.match.MatchDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MatchService {
    MatchDTO getMatchById (Long matchId, boolean showChampionImg, boolean showItemImg);
    List<MatchDTO> findMatchesByUserId(Long userId, boolean showChampionImg, boolean showItemImg);
    List<MatchDTO> getAllMatches ( boolean showChampionImg, boolean showItemImg);
    MatchDTO createMatch(ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                         boolean showChampion, boolean showItem);
    MatchDTO createMatchForUser (Long userId,String gameMode, String map, boolean showChampion, boolean showItem);
    MatchDTO createMatchForUserAndRole(Long userId,String role,String gameMode, boolean showChampion, boolean showItem);
    MatchDTO updateMatchById(Long matchId, ServerOption serverOption, String gameMode, String map, UserRankTier elo,
                             Long optionalUserId, String optionalRole, boolean showChampion, boolean showItem);
    void delete (Long id);
    String generateRankedGames();


}
