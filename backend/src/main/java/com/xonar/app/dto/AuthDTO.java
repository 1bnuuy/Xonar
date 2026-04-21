package com.xonar.app.dto;

import java.util.Set;
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
    @NotBlank private String username;
    @NotBlank private String password;

    @Builder.Default private Set<String> role = Set.of("USER");
}
