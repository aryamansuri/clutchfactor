package com.clutchfactor.backend.service;

import com.clutchfactor.backend.dto.GameDto;

import com.clutchfactor.backend.entity.ProbabilitySnapshotEntity;
import com.clutchfactor.backend.repository.ProbabilitySnapshotRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.scheduling.annotation.Scheduled;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveGameBroadcaster {

    private final SimpMessagingTemplate
        messagingTemplate;

    private final RealGameStateService
        realGameStateService;

    private final ProbabilitySnapshotRepository
        repository;

    public LiveGameBroadcaster(

            SimpMessagingTemplate
            messagingTemplate,
            RealGameStateService
            realGameStateService,
            ProbabilitySnapshotRepository repository
    ) {

        this.messagingTemplate =
            messagingTemplate;
        this.realGameStateService =
            realGameStateService;
        this.repository = repository;
    }

    @Scheduled(fixedRate = 30000)
    public void broadcastGames() {

        List<GameDto> games =
            realGameStateService
                .getLiveGames();

        if (games.isEmpty()) {
            return;
        }

        for (GameDto game : games) {

            repository.save(
                new ProbabilitySnapshotEntity(

                    game.id,

                    game.probability,

                    game.homeScore,

                    game.awayScore,

                    java.time.LocalDateTime.now()
                )
            );
        }

        messagingTemplate.convertAndSend(
            "/topic/games",
            games
        );
    }
}