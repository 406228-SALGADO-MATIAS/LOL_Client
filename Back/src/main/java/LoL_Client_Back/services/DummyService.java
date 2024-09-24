package LoL_Client_Back.services;


import LoL_Client_Back.dtos.DummyDto;
import LoL_Client_Back.models.Dummy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DummyService {
    Dummy getDummy(Long id);

    List<Dummy> getDummyList();

    Dummy createDummy(DummyDto dummyDto);

    Dummy updateDummy(DummyDto dummyDto);

    void deleteDummy(Long id);

}
