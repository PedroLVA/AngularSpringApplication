package com.example.demo.domain.product;

import java.time.LocalDateTime;

public record RequestProduct(
        String id,
        String name,
        Integer price_in_cents,
        String description,
        Categories category,
        LocalDateTime createdAt) {
}
