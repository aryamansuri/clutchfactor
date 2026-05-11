package com.clutchfactor.backend.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Component;

@Component
public class GameUpdateBroadcaster {

    private final SimpMessagingTemplate messagingTemplate;

    public GameUpdateBroadcaster(
        SimpMessagingTemplate messagingTemplate
    ) {

        this.messagingTemplate = messagingTemplate;
    }

    public void broadcast(Object payload) {

        messagingTemplate.convertAndSend(
            "/topic/games",
            payload
        );
    }
}