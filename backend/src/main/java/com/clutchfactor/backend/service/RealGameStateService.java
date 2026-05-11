package com.clutchfactor.backend.service;

import com.clutchfactor.backend.dto.GameDto;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

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

            cachedGames = games;

            for (GameDto game : games) {

                int swing =
                    random.nextInt(11) - 5;

                int updatedProbability =
                    Math.max(
                        1,
                        Math.min(
                            99,
                            game.probability + swing
                        )
                    );

                game.probability =
                    updatedProbability;
            }

            return games;

        } catch (Exception e) {

            System.out.println(
                "Failed to fetch live NBA data."
            );

            return cachedGames;
        }
    }
}