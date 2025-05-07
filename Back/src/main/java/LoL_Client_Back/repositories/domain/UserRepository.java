package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ServerRegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    List<UserEntity> findAll();

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

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsernameAndServer(String username, ServerRegionEntity server);
    Optional<UserEntity> findByNicknameAndServer(String nickname, ServerRegionEntity server);



}
