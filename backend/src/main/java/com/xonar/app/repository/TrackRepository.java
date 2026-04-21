package com.xonar.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.xonar.app.entity.TrackEntity;

//CRUD Functionality
//Track is the object stored in mongoDB, and String is the type of Track's id
public interface TrackRepository extends MongoRepository<TrackEntity, String> {
    boolean existsByTitleIgnoreCaseAndOwner(String title, String name);
    List<TrackEntity> findByOwner(String owner);
}
