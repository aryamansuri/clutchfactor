package com.clutchfactor.backend.dto;

public class GameDto {

    public int id;

    public String homeTeam;

    public String awayTeam;

    public int homeScore;

    public int awayScore;

    public int probability;

    public String quarter;

    public String time;

    public int period;

    public GameDto(
        int id,
        String homeTeam,
        String awayTeam,
        int homeScore,
        int awayScore,
        int probability,
        String quarter,
        String time,
        int period
    ) {

        this.id = id;

        this.homeTeam = homeTeam;

        this.awayTeam = awayTeam;

        this.homeScore = homeScore;

        this.awayScore = awayScore;

        this.probability = probability;

        this.quarter = quarter;

        this.time = time;

        this.period = period;
    }
}