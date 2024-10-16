package com.example.demo.repositories;

import com.example.demo.domain.product.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProductRepositoryPage extends PagingAndSortingRepository<Product, String> {
    Page<Product> findAllByActiveTrue(Pageable pageable);
}
