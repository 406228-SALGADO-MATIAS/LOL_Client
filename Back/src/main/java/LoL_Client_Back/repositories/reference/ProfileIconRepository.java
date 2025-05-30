package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.ProfileIconEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileIconRepository extends JpaRepository<ProfileIconEntity,Long> {
    List<ProfileIconEntity> findByIconIgnoreCaseContaining (String iconName);
    Optional<ProfileIconEntity> findByIconIgnoreCase(String iconName);
}
