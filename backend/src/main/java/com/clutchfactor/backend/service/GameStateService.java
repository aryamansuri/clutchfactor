package com.clutchfactor.backend.service;

import com.clutchfactor.backend.websocket.GameUpdateBroadcaster;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameStateService {

    private final GameUpdateBroadcaster broadcaster;

    private final List<Map<String, Object>> games;

    public GameStateService(
        GameUpdateBroadcaster broadcaster
    ) {

        this.broadcaster = broadcaster;

        games = new ArrayList<>();

        games.add(createGame(
            1,
            "GSW",
            "LAL",
            112,
            108,
            84
        ));

        games.add(createGame(
            2,
            "BOS",
            "MIA",
            98,
            94,
            73
        ));

        games.add(createGame(
            3,
            "DEN",
            "PHX",
            101,
            99,
            58
        ));

        games.add(createGame(
            4,
            "NYK",
            "MIL",
            120,
            118,
            62
        ));
    }

    private Map<String, Object> createGame(
        int id,
        String homeTeam,
        String awayTeam,
        int homeScore,
        int awayScore,
        int probability
    ) {

        Map<String, Object> game =
            new HashMap<>();

        game.put("id", id);

        game.put("homeTeam", homeTeam);
        game.put("awayTeam", awayTeam);

        game.put("homeScore", homeScore);
        game.put("awayScore", awayScore);

        game.put("quarter", "Q4");
        game.put("time", "2:31");

        game.put("probability", probability);

        return game;
    }

    public List<Map<String, Object>> getLiveGames() {

        return games;
    }

    public Map<String, Object> getGameById(
        int id
    ) {

        return games.stream()

            .filter(game ->
                (int) game.get("id") == id
            )

            .findFirst()

            .orElseThrow();
    }

    @Scheduled(fixedRate = 3000)
    public void updateGames() {

        Random random = new Random();

        for (Map<String, Object> game : games) {

            int homeScore =
                (int) game.get("homeScore");

            int awayScore =
                (int) game.get("awayScore");

            if (random.nextBoolean()) {
                homeScore += random.nextInt(4);
            } else {
                awayScore += random.nextInt(4);
            }

            int scoreDiff =
                homeScore - awayScore;

            int probability =
                Math.max(
                    1,
                    Math.min(
                        99,
                        50 + scoreDiff * 4
                    )
                );

            game.put("homeScore", homeScore);
            game.put("awayScore", awayScore);

            game.put("probability", probability);
        }

        broadcaster.broadcast(games);
    }
}