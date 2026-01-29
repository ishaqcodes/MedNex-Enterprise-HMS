package com.mednex.mednex_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mednex.mednex_backend.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}