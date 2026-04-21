package com.xonar.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class TrackDTO {
    private String id;
    @NotBlank private String cover;
    @NotBlank private String title;
    @NotBlank private String artist;
    @NotBlank private String fileURL;

    @NotNull @Builder.Default private Boolean favorited = false;
}
