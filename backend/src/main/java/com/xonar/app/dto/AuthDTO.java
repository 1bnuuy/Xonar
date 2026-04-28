package com.xonar.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
@Builder
public class AuthDTO {
    private String id;
    @NotBlank private String email; 
    @NotBlank private String password;
    private String refreshToken; 
    @Builder.Default private String role = "USER";
}
