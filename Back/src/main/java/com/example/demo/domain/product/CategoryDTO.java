package com.example.demo.domain.product;

public class CategoryDTO {
    private String name;  // Enum name (e.g., "ELECTRONICS")
    private String category;  // Localized category name (e.g., "Eletrônicos")

    public CategoryDTO(String name, String category) {
        this.name = name;
        this.category = category;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }
}
