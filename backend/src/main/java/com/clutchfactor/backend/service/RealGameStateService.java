package com.clutchfactor.backend.service;

import com.clutchfactor.backend.dto.GameDto;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.Optional;

@Service
public class RealGameStateService {

    private final NbaApiService nbaApiService;

    private List<GameDto> cachedGames =
            new java.util.ArrayList<>();

    private final Random random =
        new Random();

    public RealGameStateService(
        NbaApiService nbaApiService
    ) {

        this.nbaApiService =
            nbaApiService;
    }

    public List<GameDto> getLiveGames() {

        try {

            List<GameDto> games =
                nbaApiService.fetchLiveGames();

            if (games != null) {
                cachedGames = games;
            }

        } catch (Exception e) {

            System.out.println(
                "Using cached NBA data."
            );

        }

        return cachedGames;
    }

    public Optional<GameDto> getGameById(int id) {
        return cachedGames.stream()
            .filter(game -> game.id == id)
            .findFirst();
    }
}