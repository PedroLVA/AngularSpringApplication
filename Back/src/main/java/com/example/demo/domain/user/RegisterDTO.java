package com.example.demo.domain.user;

public record RegisterDTO(String login, String password, UserRole role) {
}
