package com.xonar.app.service;

import com.xonar.app.entity.AuthEntity;
import com.xonar.app.repository.AuthRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {
    private final AuthRepository repository;

    public AuthService(AuthRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthEntity user = repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Nonexistent user"));

        return org.springframework.security.core.userdetails.User
        .withUsername(user.getUsername())
        .password(user.getPassword())
        .roles(user.getRole().toArray(new String[0]))
        .build();
    }
}
