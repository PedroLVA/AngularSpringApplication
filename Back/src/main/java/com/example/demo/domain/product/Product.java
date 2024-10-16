package com.example.demo.domain.product;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table(name="product")
@Entity(name="product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@EqualsAndHashCode(of = "id")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private Integer priceInCents;

    private String description;

    private String category;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private Boolean active;

    public Product(RequestProduct data){
        this.name = data.name();
        this.priceInCents = data.priceInCents();
        this.active = true;
        this.description = data.description();
        this.setCategory(data.category());
    }

    public void setCategory(String category) {
        // Validate the category name using the enum
        Categories.fromCategoryName(category);
        this.category = category;
    }


}
