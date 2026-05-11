package com.clutchfactor.backend.repository;

import com.clutchfactor.backend.entity
    .ProbabilitySnapshotEntity;

import org.springframework.data.jpa.repository
    .JpaRepository;

import java.util.List;

public interface
ProbabilitySnapshotRepository
extends JpaRepository<
    ProbabilitySnapshotEntity,
    Long
> {

    List<ProbabilitySnapshotEntity>
    findByGameIdOrderByTimestampAsc(
        int gameId
    );
}