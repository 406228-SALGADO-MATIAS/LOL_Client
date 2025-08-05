package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.RankTierEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {


    @Query("SELECT u FROM UserEntity u " +
            "WHERE u.email = :email " +
            "OR (u.server = :server " +
            "AND (u.username = :username OR u.nickname = :nickname))")

    Optional<UserEntity> findExistingUserData(
            @Param("email") String email,
            @Param("server") ServerRegionEntity server,
            @Param("username") String username,
            @Param("nickname") String nickname
    );

    //unique email
    Optional<UserEntity> findByEmailIgnoreCase(String email);

    //similar emails
    List<UserEntity> findByEmailIgnoreCaseContaining(String email);

    //specifics
    Optional<UserEntity> findByUsernameAndServer(String username, ServerRegionEntity server);
    Optional<UserEntity> findByNicknameIgnoreCaseAndServer(String nickname, ServerRegionEntity server);

    //nicknames
    List<UserEntity> findByNicknameIgnoreCaseContaining(String nickname);
    //nicknames per server
    List<UserEntity> findByNicknameIgnoreCaseContainingAndServer(String nickname, ServerRegionEntity server);
    //usernames
    List<UserEntity> findByUsernameIgnoreCaseContaining(String username);
    List<UserEntity> findByRank(RankTierEntity rankTierEntity);
    List<UserEntity> findByRankAndServer(RankTierEntity rank, ServerRegionEntity server);
    List<UserEntity> findByRegistrationDateGreaterThanEqualOrderByRegistrationDateAsc(LocalDateTime date);

    List<UserEntity> findByRankIsNull();
    List<UserEntity> findByRankIsNullAndServer(ServerRegionEntity server);
    List<UserEntity> findByServer(ServerRegionEntity serverRegion);

    @Query("SELECT u FROM UserEntity u WHERE u.server = :server AND u.username = :username AND u.password = :password")
    Optional<UserEntity> findByServerAndUsernameAndPassword(@Param("server") ServerRegionEntity server,
                                                            @Param("username") String username,
                                                            @Param("password") String password);




}
