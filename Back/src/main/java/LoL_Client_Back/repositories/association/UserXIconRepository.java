package LoL_Client_Back.repositories.association;

import LoL_Client_Back.entities.association.UserXIconEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.entities.reference.ProfileIconEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserXIconRepository extends JpaRepository<UserXIconEntity, Long> {

    List<UserXIconEntity> findByIcon_Id(Long id);
    List<UserXIconEntity> findByUser_Id(Long id);
    Optional<UserXIconEntity> findByUserAndIcon(UserEntity userEntity, ProfileIconEntity iconEntity);

    boolean existsByUser_IdAndIcon_Id(Long userId, Long iconId);

    @Query("""
        SELECT i FROM ProfileIconEntity i
        WHERE i.id NOT IN (
            SELECT uxi.icon.id FROM UserXIconEntity uxi WHERE uxi.user.id = :userId
        )
    """)
    List<ProfileIconEntity> findIconsNotOwnedByUser(@Param("userId") Long userId);
}
