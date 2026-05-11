package com.clutchfactor.backend.controller;

import com.clutchfactor.backend.dto.GameDto;
import com.clutchfactor.backend.entity.ProbabilitySnapshotEntity;
import com.clutchfactor.backend.repository.ProbabilitySnapshotRepository;
import com.clutchfactor.backend.service.GameStateService;

import com.clutchfactor.backend.service.RealGameStateService;
import org.springframework.web.bind.annotation.*;

import com.clutchfactor.backend.service.NbaApiService;

import java.util.*;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameStateService gameStateService;
    private final RealGameStateService
    realGameStateService;
    private final ProbabilitySnapshotRepository
    repository;

    public GameController(
            GameStateService gameStateService,
            RealGameStateService realGameStateService, ProbabilitySnapshotRepository repository
    ) {

        this.gameStateService =
            gameStateService;

        this.realGameStateService =
            realGameStateService;
        this.repository = repository;
    }

    @GetMapping("/live")
    public List<Map<String, Object>> getLiveGames() {

        return gameStateService.getLiveGames();
    }

    @GetMapping("/real")
    public List<GameDto> getRealGames() {

        return realGameStateService
            .getLiveGames();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getGameById(@PathVariable int id) {

        return gameStateService.getGameById(id);
    }

    @GetMapping("/{id}/history")
    public List<ProbabilitySnapshotEntity>
    getHistory(

        @PathVariable int id
    ) {

        return repository
            .findByGameIdOrderByTimestampAsc(id);
    }
}