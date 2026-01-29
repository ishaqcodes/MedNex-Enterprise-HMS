package com.mednex.MedNex_Backend.controller;

import com.mednex.MedNex_Backend.entity.Patient;
import com.mednex.MedNex_Backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*") // Frontend ko allow karne ke liye
public class PatientController {

    @Autowired
    private PatientRepository repository;

    // 1. Patient Admit karna (Save Data)
    @PostMapping
    public Patient admitPatient(@RequestBody Patient patient) {
        return repository.save(patient);
    }

    // 2. Patient List dekhna
    @GetMapping
    public List<Patient> getAllPatients() {
        return repository.findAll();
    }
}