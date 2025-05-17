package LoL_Client_Back.repositories.reference;

import LoL_Client_Back.entities.reference.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {
    Optional<RoleEntity> findByRoleIgnoreCase (String role);
}
