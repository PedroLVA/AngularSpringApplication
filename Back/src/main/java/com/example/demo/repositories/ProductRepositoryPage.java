package com.example.demo.repositories;

import com.example.demo.domain.product.Product;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepositoryPage extends PagingAndSortingRepository<Product, String> {

}
