package com.mednex.mednex_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mednex.mednex_backend.entity.Patient;
import com.mednex.mednex_backend.repository.PatientRepository;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*") // Frontend ko allow karne ke liye
public class PatientController {

    private final PatientRepository repository;

    public PatientController(PatientRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Patient admitPatient(@RequestBody Patient patient) {
        return repository.save(patient);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return repository.findAll();
    }
}