package com.example.demo.domain.user;

public record LoginResponseDTO(String token, String login, UserRole role) {
}
