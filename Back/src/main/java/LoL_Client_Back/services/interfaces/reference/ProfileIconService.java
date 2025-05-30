package LoL_Client_Back.services.interfaces.reference;

import LoL_Client_Back.dtos.reference.ProfileIconDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProfileIconService {
    ProfileIconDTO getById (Long id);
    List<ProfileIconDTO> getAll ();
    List<ProfileIconDTO> findByName(String name);
    ProfileIconDTO createProfileIcon (String iconName, String imageUrl, Integer blueEssencePrice);
    ProfileIconDTO updateProfileIcon (Long id,String iconName, String imageUrl,Integer blueEssencePrice);
    void deleteProfileIcon(Long id);
}
