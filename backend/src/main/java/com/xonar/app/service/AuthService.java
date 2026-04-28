package com.xonar.app.service;

import com.xonar.app.dto.AuthDTO;
import com.xonar.app.dto.Response.AuthResponse;
import com.xonar.app.entity.AuthEntity;
import com.xonar.app.exception.status.ConflictException;
import com.xonar.app.exception.status.NotFoundException;
import com.xonar.app.exception.status.ServiceException;
import com.xonar.app.exception.status.TokenException;
import com.xonar.app.mapper.AuthMapper;
import com.xonar.app.repository.AuthRepository;
import com.xonar.app.security.JwtUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@RequiredArgsConstructor
@Validated
public class AuthService {
    private final AuthRepository authRepository;
    private final AuthMapper authMapper;
    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder encoder;
    private final LoadUserDetails loadUserDetails;

    @Transactional(readOnly = true)
    public AuthDTO getService(@NonNull Authentication authentication) {
        return authRepository.findByEmail(authentication.getName())
            .map(authMapper::toDTO)
            .orElseThrow(() -> new NotFoundException("User not found: " + authentication.getName()));
    }

    @Transactional
    public AuthResponse registerService(@Valid AuthDTO dto) {
        if (authRepository.existsByEmailIgnoreCase(dto.getEmail())) 
            throw new ConflictException("Email " + dto.getEmail() + " already exists");

        AuthEntity entity = authMapper.toEntity(dto, encoder.encode(dto.getPassword()));

        if (entity == null) 
            throw new ServiceException("Failed to map user data");

        authRepository.save(entity);

        return new AuthResponse(null, null, "Registered successfully");
    }

    @Transactional
    public AuthResponse loginService(@Valid AuthDTO dto) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.generateAccessToken(userDetails);
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);

        AuthEntity entity = authRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new NotFoundException("User not found after authentication"));
        
        entity.setRefreshToken(refreshToken);
        authRepository.save(entity); // I SPENT THE WHOLE NIGHT TO FIX /auth/refresh, TURNED OUT THE DATABASE DIDNT SAVE THE REFRESH TOKEN

        return new AuthResponse(accessToken, refreshToken, "Logged in successfully");
    }

    @Transactional(readOnly = true)
    public String refreshService(String refreshToken) {
        if (refreshToken == null || !jwtUtils.validateToken(refreshToken)) 
            throw new TokenException("User session not found");

        String user = jwtUtils.getUsernameFromToken(refreshToken);

        if (user == null)
            throw new TokenException("Token is missing user identity");

        AuthEntity entity = authRepository.findByEmail(user)
            .orElseThrow(() -> new NotFoundException("User session doesn't exist"));

        if (!refreshToken.equals(entity.getRefreshToken())) 
            // System.out.println("Expected: " + entity.getRefreshToken());
            // System.out.println("Received: " + refreshToken);
            
            throw new TokenException("Token has been revoked or is invalid");

        UserDetails userDetails = loadUserDetails.loadUserByUsername(user);
        String newAccessToken = jwtUtils.generateAccessToken(userDetails);

        return newAccessToken;
    }

    @Transactional
    public void logoutService(String refreshToken) {
        if (refreshToken == null || !jwtUtils.validateToken(refreshToken))
            throw new TokenException("User session not found");

        String user = jwtUtils.getUsernameFromToken(refreshToken);

        if (user == null) 
            throw new TokenException("Could not identify user from token");

        AuthEntity entity = authRepository.findByEmail(user)
            .orElseThrow(() -> new NotFoundException("User session doesnt exist"));

        entity.setRefreshToken(null);
        authRepository.save(entity);

        SecurityContextHolder.clearContext();
    }
}
