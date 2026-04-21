package com.xonar.app.controller;

import com.xonar.app.dto.AuthDTO;
import com.xonar.app.entity.AuthEntity;
import com.xonar.app.mapper.AuthMapper;
import com.xonar.app.repository.AuthRepository;
import com.xonar.app.security.JwtUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // Only generates a constructor for fields marked as final (AUTH_REPOSITORY, AUTH_MANAGER, JWT, ENCODER and MAPPER)
public class AuthHandler {
    
    private final AuthRepository authRepository; 
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder encoder;
    private final AuthMapper mapper;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(404).body("Not logged in");
        }

        return ResponseEntity.ok(Map.of("username", authentication.getName(), "role", authentication.getAuthorities()));
    }
    
    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthDTO dto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateTokens(authentication);

        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @SuppressWarnings("null")
    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid AuthDTO dto) {
        if (authRepository.existsByUsernameIgnoreCase(dto.getUsername())) return ResponseEntity.badRequest().body("Username already exists");

        AuthEntity user = mapper.toEntity(dto, encoder.encode(dto.getPassword()));
        authRepository.save(user);

        // Auto-login
        // Using try/catch let me what know the issue was (secret_key wasnt secure bruh)
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateTokens(authentication);

            return ResponseEntity.ok(Map.of("token", jwt, "message", "User registered successfully!"));
        
        } catch(Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            
            return ResponseEntity.status(201).body(Map.of("message", "Auto-login failed. eh?"));
        }
    }
}
