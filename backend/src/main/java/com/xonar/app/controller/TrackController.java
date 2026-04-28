package com.xonar.app.controller;

import com.xonar.app.dto.TrackDTO;
import com.xonar.app.service.TrackService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor // Only generates a constructor for fields marked as final (REPOSITORY and MAPPER)
public class TrackController {
    private final TrackService trackService;

    @GetMapping
    public ResponseEntity<List<TrackDTO>> get() {
        return ResponseEntity.ok(trackService.getService());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackDTO> create(@RequestPart("track") @Valid TrackDTO dto, @RequestPart("file") MultipartFile file, @RequestPart("image") MultipartFile image) {
        return ResponseEntity.ok(trackService.createService(dto, file, image));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TrackDTO> favorite(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(trackService.favoriteService(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NonNull String id) {
        trackService.deleteService(id);

        return ResponseEntity.noContent().build();
    }
}
