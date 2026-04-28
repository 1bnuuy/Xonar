package com.xonar.app.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.xonar.app.entity.AuthEntity;
import com.xonar.app.repository.AuthRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoadUserDetails implements UserDetailsService {
    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AuthEntity user = authRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User " + email + " doesn't exist"));

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole())
            .build();
    }
}
