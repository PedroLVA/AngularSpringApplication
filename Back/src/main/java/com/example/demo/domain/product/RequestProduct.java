package com.example.demo.domain.product;

public record RequestProduct(
        String id,
        String name,
        Integer price_in_cents) {
}
