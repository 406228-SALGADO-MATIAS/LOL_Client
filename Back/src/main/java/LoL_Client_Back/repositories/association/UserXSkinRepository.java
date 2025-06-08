package LoL_Client_Back.repositories.association;

import LoL_Client_Back.entities.association.UserXSkinEntity;
import LoL_Client_Back.entities.domain.SkinEntity;
import LoL_Client_Back.entities.domain.UserEntity;
import LoL_Client_Back.models.association.UserXSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserXSkinRepository extends JpaRepository<UserXSkinEntity,Long> {
    List<UserXSkinEntity> findBySkin_Id(Long id);
    List<UserXSkinEntity> findByUser_Id(Long id);
    List<UserXSkinEntity> findByUser_IdNot(Long id);
    Optional<UserXSkinEntity> findByUserAndSkin(UserEntity userEntity, SkinEntity skinEntity);
}
