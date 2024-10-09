package com.example.demo.repositories;

import com.example.demo.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findAllByActiveTrue();
    Optional<Product> findById(String id);
}
