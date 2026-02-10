package com.mednex.enterprise.repository;

import com.mednex.enterprise.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}