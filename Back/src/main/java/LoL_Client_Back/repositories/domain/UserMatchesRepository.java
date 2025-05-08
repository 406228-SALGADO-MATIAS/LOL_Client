package LoL_Client_Back.repositories.domain;

import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.domain.UserMatchesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMatchesRepository extends JpaRepository<UserMatchesEntity,Long> {
    Optional<UserMatchesEntity> findByUser (UserEntity userEntity);
}
