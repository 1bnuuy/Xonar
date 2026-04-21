package com.xonar.app.mapper;

import org.springframework.stereotype.Component;

import com.xonar.app.dto.AuthDTO;
import com.xonar.app.entity.AuthEntity;

@Component
public class AuthMapper {
    public AuthEntity toEntity(AuthDTO dto, String password) {
        return AuthEntity.builder()
            .username(dto.getUsername())
            .password(password)
            .role(dto.getRole())
            .build();
    }

    public AuthDTO toDTO(AuthEntity entity) {
        return AuthDTO.builder()
            .id(entity.getId())
            .username(entity.getUsername())
            .role(entity.getRole())
            .build();
    }
}
