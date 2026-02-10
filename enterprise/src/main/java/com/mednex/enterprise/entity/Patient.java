package com.mednex.enterprise.entity;

import jakarta.persistence.*; // Ye * sab kuch import kar lega
import lombok.Data;

@Entity
@Table(name = "patient")
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String hospitalName;
}