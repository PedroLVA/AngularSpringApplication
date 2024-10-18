package com.example.demo.services;

import com.example.demo.domain.product.PaginationResponseDTO;
import com.example.demo.domain.product.Product;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.ProductRepositoryPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductRepositoryPage repositoryPage;

    public PaginationResponseDTO getProducts(int page, int size, String sort){

        Sort sortOrder = Sort.unsorted();
        if (sort != null) {
            sortOrder = switch (sort) {
                case "asc" -> Sort.by("priceInCents").ascending(); // Price ascending
                case "desc" -> Sort.by("priceInCents").descending(); // Price descending
                case "old" -> Sort.by("createdAt").ascending(); // Oldest first
                case "new" -> Sort.by("createdAt").descending(); // Newest first
                default -> sortOrder;
            };
        }

        PageRequest pr = PageRequest.of(page, size, sortOrder);
        Page<Product> productPage = repositoryPage.findAllByActiveTrue(pr);
        List<Product> products = productPage.getContent();

        return new PaginationResponseDTO(productPage.getNumber(),
                productPage.getTotalPages(),
                productPage.getTotalElements(),
                products,
                productPage.isLast());
    }
}
