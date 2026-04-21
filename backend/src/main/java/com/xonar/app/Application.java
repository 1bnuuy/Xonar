package com.xonar.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
            .directory("backend")
            .filename(".env.local")
            .ignoreIfMissing() //Omits .env.local in production, this fixed the render deployment lmao
            .load();
    
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
        
        SpringApplication.run(Application.class, args);
    }
} // IP: 0.0.0.0/0 on MongoDB's Network Access allows access from everywhere (fixes Render)

