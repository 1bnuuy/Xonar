package com.xonar.app.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @ToString <-- For printing human-readable strings in TrackHandler's @Mappings (debug purpose)
public class TrackEntity {

    @Id @Setter(AccessLevel.NONE) 
    private String id;

    @Indexed private String owner;
    private String coverURL;
    @NotBlank private String title;
    @NotBlank private String artist;
    private String fileURL;

    @Builder.Default
    private Boolean favorited = false;

    private String coverPublicId;
    private String filePublicId;
}
