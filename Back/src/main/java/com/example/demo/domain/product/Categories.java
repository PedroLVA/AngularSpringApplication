package com.example.demo.domain.product;

public enum Categories {
    ELECTRONICS("Eletrônicos"),
    FURNITURE("Móveis"),
    CLOTHING("Roupas"),
    GROCERY("Alimentos");

    private final String category;


    Categories(String category) {
        this.category = category;
    }


    public String getCategory() {
        return category;
    }
}
