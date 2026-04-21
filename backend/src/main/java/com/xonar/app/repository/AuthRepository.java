package com.xonar.app.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.xonar.app.entity.AuthEntity;

public interface AuthRepository extends MongoRepository<AuthEntity, String> {

    Optional<AuthEntity> findByUsername(String username);

    boolean existsByUsernameIgnoreCase(String username);
}   