package com.xonar.app.controller;

import com.xonar.app.dto.TrackDTO;
import com.xonar.app.entity.TrackEntity;
import com.xonar.app.mapper.TrackMapper;
import com.xonar.app.repository.TrackRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor // Only generates a constructor for fields marked as final (REPOSITORY and MAPPER)
public class TrackHandler {
    private final TrackRepository REPOSITORY;
    private final TrackMapper MAPPER;

    @GetMapping
    public List<TrackDTO> get() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        return REPOSITORY.findByOwner(name).stream()
        .map(MAPPER::toDTO)
        .toList();
    }

    @SuppressWarnings("null")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid TrackDTO dto) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        if (REPOSITORY.existsByTitleIgnoreCaseAndOwner(dto.getTitle(), name)) {
            return ResponseEntity.badRequest().body("You already have this track");
        }
        
        TrackEntity entity = MAPPER.toEntity(dto, name);

        // System.out.println(entity); <-- debugging

        return ResponseEntity.ok(MAPPER.toDTO(REPOSITORY.save(entity)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable @NonNull String id) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        return REPOSITORY.findById(id)
        .map(track -> {
            if (!track.getOwner().equalsIgnoreCase(name)) {
                return ResponseEntity.status(403).body("Unauthorized to alter this track");
            }

            track.setFavorited(!track.getFavorited());
        
            return ResponseEntity.ok(MAPPER.toDTO(REPOSITORY.save(track)));
        })
        .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable @NonNull String id) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        return REPOSITORY.findById(id)
        .map(track -> {
            if (!track.getOwner().equalsIgnoreCase(name)) {
                return ResponseEntity.status(403).body("Unauthorized to delete this track");
            }

            REPOSITORY.deleteById(id);

            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
    }
}
