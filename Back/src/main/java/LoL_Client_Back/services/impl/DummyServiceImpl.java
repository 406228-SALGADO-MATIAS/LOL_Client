package LoL_Client_Back.services.impl;

import LoL_Client_Back.dtos.DummyDto;
import LoL_Client_Back.models.Dummy;
import LoL_Client_Back.repositories.DummyRepository;
import LoL_Client_Back.services.DummyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.List;

@Service
public class DummyServiceImpl implements DummyService {
    @Autowired
    private DummyRepository dummyRepository;
    @Override
    public Dummy getDummy(Long id) {
        return null;
    }

    @Override
    public List<Dummy> getDummyList() {
        return null;
    }

    @Override
    public Dummy createDummy(DummyDto dummyDto) {
        return null;
    }

    @Override
    public Dummy updateDummy(DummyDto dummyDto) {
        return null;
    }

    @Override
    public void deleteDummy(Long id) {
        if (dummyRepository.existsById(id)) {
            dummyRepository.deleteById(id);
        } else {
            throw new RuntimeException("No se encontró el elemento con el ID proporcionado");
        }
    }
}
