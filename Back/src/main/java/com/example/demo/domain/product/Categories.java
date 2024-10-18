package com.example.demo.domain.product;

import java.util.Arrays;

public enum Categories {
    ELECTRONICS("Eletrônicos"),
    FURNITURE("Móveis"),
    CLOTHING("Roupas"),
    GROCERY("Alimentos"),
    TOYS("Brinquedos"),
    HEALTH("Saúde"),
    SPORTS("Esportes"),
    BEAUTY("Beleza"),
    BOOKS("Livros"),
    STATIONERY("Papelaria"),
    AUTOMOTIVE("Automotivo"),
    PET_SUPPLIES("Pet Shop"),
    HOME_APPLIANCES("Eletrodomésticos"),
    GARDENING("Jardinagem"),
    MUSIC("Música"),
    OFFICE_SUPPLIES("Escritório"),
    JEWELRY("Joias"),
    FOOTWEAR("Calçados"),
    BABY_PRODUCTS("Bebês"),
    SOFTWARE("Software"),
    VIDEO_GAMES("Videogames");

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
