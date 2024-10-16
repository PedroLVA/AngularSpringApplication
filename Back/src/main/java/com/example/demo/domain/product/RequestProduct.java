package com.example.demo.domain.product;

import java.time.LocalDateTime;

public record RequestProduct(
        String id,
        String name,
        Integer priceInCents,
        String description,
        String category,
        LocalDateTime createdAt) {
}
