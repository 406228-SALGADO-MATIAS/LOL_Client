package LoL_Client_Back.services.interfaces.assocation;

import LoL_Client_Back.dtos.association.UserXIconDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserXIconService {
    UserXIconDTO findById(Long id);
    List<UserXIconDTO> getAll();
    List<UserXIconDTO> findByIconId(Long id);
    List<UserXIconDTO> findByUserId(Long id);
    UserXIconDTO findByUserAndIcon(Long iconId, Long userId);
    void deleteById(Long id);
    UserXIconDTO createIconBelonging(Long idUser, Long idIcon);
    UserXIconDTO updateIconBelonging(Long idBelonging, Long idUser, Long idIcon);
    String giveIconsToAllUsers();
}
