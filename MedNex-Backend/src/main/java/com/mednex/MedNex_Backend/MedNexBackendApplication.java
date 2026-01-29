package com.mednex.MedNex_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MedNexBackendApplication {
    public static void main(String[] args) {
        System.out.println("🛑 DEBUG: Application Starting...");
        SpringApplication.run(MedNexBackendApplication.class, args);
        System.out.println("🛑 DEBUG: Application Started Successfully!");
    }
}