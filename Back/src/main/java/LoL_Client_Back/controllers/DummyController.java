package LoL_Client_Back.controllers;

import LoL_Client_Back.dtos.DummyDto;
import LoL_Client_Back.models.Dummy;
import LoL_Client_Back.services.interfaces.DummyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("dummy")
public class DummyController {

    //url
    // http://localhost:8080/swagger-ui/index.html#/
    @Autowired
    private DummyService dummyService;

    @PostMapping("")
    public ResponseEntity<DummyDto> createDummy(@RequestBody DummyDto dummyDto) {

        Dummy dummy = dummyService.createDummy(dummyDto);
        return null;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Dummy>> getDummyList()
    {
        List<Dummy> lecturas = dummyService.getDummyList();
        return ResponseEntity.ok(lecturas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dummy> getDummyById(@PathVariable Long id)
    {
        Dummy dummy = dummyService.getDummy(id);
        return ResponseEntity.ok(dummy);
    }

    @PutMapping("")
    public ResponseEntity<Dummy> updateDummy(@RequestBody DummyDto dummyDto) {
        Dummy dummy = dummyService.updateDummy(dummyDto);
        if (dummy == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The post of the match was unsuccesfull");
        } else {
            return ResponseEntity.ok(dummy);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteSensorById(@PathVariable Long id) {
        try {
            dummyService.deleteDummy(id);
            return ResponseEntity.ok("Se eliminó correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar");
        }
    }
}
