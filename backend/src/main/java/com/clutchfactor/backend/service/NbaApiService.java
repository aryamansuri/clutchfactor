package com.clutchfactor.backend.service;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.*;

import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import com.clutchfactor.backend.dto.GameDto;

import com.fasterxml.jackson.databind.JsonNode;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;

import java.util.Collections;
import java.util.List;

@Service
public class NbaApiService {

    @Value("${balldontlie.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate =
        new RestTemplate();

    public List<GameDto> fetchLiveGames() {

        try {

            String today =
                java.time.LocalDate.now(
                    java.time.ZoneId.of("America/New_York")
                ).toString();

            String url =
                "https://api.balldontlie.io/v1/games?dates[]=" + today;

            HttpHeaders headers =
                new HttpHeaders();

            headers.set(
                "Authorization",
                apiKey
            );

            HttpEntity<String> entity =
                new HttpEntity<>(headers);

            ResponseEntity<String> response =
                restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
                );

            ObjectMapper mapper =
                new ObjectMapper();

            JsonNode root =
                mapper.readTree(
                    response.getBody()
                );

            JsonNode data =
                root.get("data");

            List<GameDto> games =
                new ArrayList<>();

            for (JsonNode game : data) {

                int period =
                    game.get("period").asInt();

                String status =
                    game.get("status").asText();

                // Skip games that haven't started yet
                if (
                    period == 0 &&
                    !status.equals("Final")
                ) {
                    continue;
                }

                int homeScore =
                    game.get("home_team_score")
                        .asInt();

                int awayScore =
                    game.get("visitor_team_score")
                        .asInt();

                int scoreDiff =
                    homeScore - awayScore;

                int probability =
                    calculateProbability(
                        scoreDiff,
                        period
                    );

                String quarter =
                    status.equals("Final")
                        ? "Final"
                        : "Q" + period;

                String gameTime =
                    game.get("time").isNull()
                        ? ""
                        : game.get("time").asText();

                GameDto dto =
                    new GameDto(

                        game.get("id").asInt(),

                        game.get("home_team")
                            .get("abbreviation")
                            .asText(),

                        game.get("visitor_team")
                            .get("abbreviation")
                            .asText(),

                        homeScore,

                        awayScore,

                        probability,

                        quarter,

                        gameTime,

                        period
                    );

                games.add(dto);
            }

            return games;

        } catch (Exception e) {

            System.out.println("Using cached NBA data (API rate limited).");
            return Collections.emptyList();
        }
    }

    private int calculateProbability(
        int scoreDiff,
        int period
    ) {

        int base = 50;

        int multiplier;

        if (period <= 1) {

            multiplier = 2;

        } else if (period == 2) {

            multiplier = 3;

        } else if (period == 3) {

            multiplier = 4;

        } else {

            multiplier = 5;
        }

        int probability =
            base + (scoreDiff * multiplier);

        return Math.max(
            1,
            Math.min(99, probability)
        );
    }
}