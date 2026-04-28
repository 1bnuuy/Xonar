package com.xonar.app.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    @Value("${app.jwt.secret}") private String secretKey;

    // Short-lived token
    public String generateAccessToken(UserDetails user) {
        return Jwts.builder()
            .subject(user.getUsername())
            .issuedAt(new Date())
            .expiration(new Date((new Date()).getTime() + 15 * 60 * 1000)) // 15 mins - In Ms
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
            .compact();
    }

    // Long-lived token
    public String generateRefreshToken(UserDetails user) {
        return Jwts.builder()
            .subject(user.getUsername())
            .issuedAt(new Date())
            .expiration(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)) // 1 days
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
            .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token);
            
            return true;

        } catch (JwtException e) {
            return false;
        }
    }
}
