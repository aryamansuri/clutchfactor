package com.clutchfactor.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ProbabilitySnapshotEntity {

    @Id
    @GeneratedValue(strategy =
        GenerationType.IDENTITY)

    private Long id;

    private int gameId;

    private int probability;

    private int homeScore;

    private int awayScore;

    private LocalDateTime timestamp;

    public ProbabilitySnapshotEntity() {
    }

    public ProbabilitySnapshotEntity(
        int gameId,
        int probability,
        int homeScore,
        int awayScore,
        LocalDateTime timestamp
    ) {

        this.gameId = gameId;

        this.probability = probability;

        this.homeScore = homeScore;

        this.awayScore = awayScore;

        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public int getGameId() {
        return gameId;
    }

    public int getProbability() {
        return probability;
    }

    public int getHomeScore() {
        return homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}