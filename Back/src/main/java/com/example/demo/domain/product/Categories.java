package com.example.demo.domain.product;

import java.util.Arrays;

public enum Categories {
    ELECTRONICS("Eletrônicos"),
    FURNITURE("Móveis"),
    CLOTHING("Roupas"),
    GROCERY("Alimentos"),
    TOYS("Brinquedos");

    private final String category;


    Categories(String category) {
        this.category = category;
    }


    public String getCategory() {
        return category;
    }


    public static Categories fromCategoryName(String categoryName) {
        return Arrays.stream(Categories.values())
                .filter(c -> c.getCategory().equalsIgnoreCase(categoryName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid category name: " + categoryName));
    }
}
