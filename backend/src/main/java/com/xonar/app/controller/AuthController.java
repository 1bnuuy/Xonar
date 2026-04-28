package com.xonar.app.controller;

import com.xonar.app.dto.AuthDTO;
import com.xonar.app.dto.Response.AuthResponse;
import com.xonar.app.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // Only generates a constructor for fields marked as final
public class AuthController {
    private final AuthService authService;

    @GetMapping("/dashboard")
    public ResponseEntity<AuthDTO> getUser(@NonNull Authentication authentication) {
        return ResponseEntity.ok(authService.getService(authentication));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthDTO dto) {
        AuthResponse response = authService.registerService(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthDTO dto) {
        AuthResponse response = authService.loginService(dto);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", response.refreshToken())
            .httpOnly(true)
            .secure(true) // false for local development (http://), otherwise true
            .path("/")
            .maxAge(24 * 60 * 60) // In seconds
            .sameSite("None")
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(response);
    }

    @PostMapping("/auth/refresh") 
    public ResponseEntity<Map<String,String>> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        String newAccessToken = authService.refreshService(refreshToken);

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken, "message", "Token has been refreshed"));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<Void> logoutController(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        authService.logoutService(refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0)
            .build();

        return ResponseEntity.noContent()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .build();
    }
}
