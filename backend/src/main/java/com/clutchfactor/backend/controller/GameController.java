package com.clutchfactor.backend.controller;

import com.clutchfactor.backend.dto.GameDto;
import com.clutchfactor.backend.entity.ProbabilitySnapshotEntity;
import com.clutchfactor.backend.repository.ProbabilitySnapshotRepository;

import com.clutchfactor.backend.service.RealGameStateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clutchfactor.backend.service.NbaApiService;

import java.util.*;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    private final RealGameStateService
    realGameStateService;
    private final ProbabilitySnapshotRepository
    repository;

    public GameController(
            RealGameStateService realGameStateService, ProbabilitySnapshotRepository repository
    ) {

        this.realGameStateService =
            realGameStateService;
        this.repository = repository;
    }

    @GetMapping("/real")
    public List<GameDto> getRealGames() {

        return realGameStateService
            .getLiveGames();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGameById(
        @PathVariable int id
    ) {

        return realGameStateService
            .getGameById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
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