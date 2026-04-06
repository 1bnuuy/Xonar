package com.xonar.app.controller;

import com.xonar.app.model.Track;
import com.xonar.app.repository.Store;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController //Tells Spring Boot that this class (Handler) handles HTTP requests
@RequestMapping("/api/data") //Defines base URL after * in localhost:8080/*
public class Handler {
    private final Store repository;

    public Handler(Store repository) {
        this.repository = repository;
    }

    @GetMapping //GET
    public List<Track> get() {
        return repository.findAll();
    }

    @PostMapping //POST
    public ResponseEntity<?> create(@RequestBody @Valid Track newTrack) {
        if (repository.existsByTitleIgnoreCase(newTrack.getTitle())) {
            return ResponseEntity.badRequest().body("Track already exists!");
        }
        Track saved = repository.save(newTrack);
        return ResponseEntity.ok(saved);
    }
    
}
