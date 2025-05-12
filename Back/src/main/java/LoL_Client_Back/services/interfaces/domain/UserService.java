package LoL_Client_Back.services.interfaces.domain;
import LoL_Client_Back.dtos.domain.*;
import LoL_Client_Back.dtos.enums.MatchType;
import LoL_Client_Back.dtos.enums.ServerOption;
import LoL_Client_Back.dtos.enums.UserRankTier;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import LoL_Client_Back.models.domain.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public interface UserService {
    UserMatchesDTO findById(Long id);
    List<User> getAllUsers();
    UserLootMatchesDTO createUser(UserDTO userDTO, ServerOption serverOption);
    UserMatchesDTO findByEmail (String email);
    List<UserMatchesDTO> findUsersByEmail(String email);
    List<UserMatchesDTO> findUsersByNickname(String nickname);
    List<UserMatchesDTO> findUsersByNicknameAndServer(String nickname, ServerOption serverOptions);
    List<UserMatchesDTO> findUsersByUsername(String username);
    UserMatchesDTO updateUser (Long id, UserDTO userDTO, ServerOption serverOption, UserRankTier rankTier);
    List<UserMatchesDTO> findUsersByRanktier(UserRankTier rankTier);
    List<UserMatchesWinrateDTO> findUsersByWinrateAndServer(MatchType matchType,ServerOption serverOption, Double minWinrate);
    List<UserMatchesWinrateDTO> findUsersByMatchesPlayed(MatchType matchType, ServerOption serverOption, Integer minMatchesPlayed);
    List<UserMatchesDTO> findUsersByRegistrationDate(LocalDateTime date);
    List<UserMatchesDTO> findUsersByRankAndServer(UserRankTier rank, ServerOption server);
}
