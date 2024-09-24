package LoL_Client_Back.repositories;

import LoL_Client_Back.entities.DummyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface DummyRepository extends JpaRepository<DummyEntity,Long> {

    //Ejemplo Query
    //@Query("SELECT p FROM PlayerEntity p " +
    //"WHERE (p.userName LIKE :identity OR p.email LIKE :identity) AND p.password LIKE :password")
    //Optional <PlayerEntity> findByUserNameOrEmailAndPassword(@Param("identity") String identity, @Param("password") String password);


}
