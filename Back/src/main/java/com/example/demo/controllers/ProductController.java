package com.example.demo.controllers;

import com.example.demo.domain.product.*;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.ProductRepositoryPage;
import com.example.demo.services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductRepositoryPage repositoryPage;

    @Autowired
    private ProductService productService;

    //Get pages
    @GetMapping()
    public ResponseEntity<PaginationResponseDTO> getAllProductsPage(@RequestParam int page, @RequestParam int size, @RequestParam(value = "sort", required = false) String sort){
        PaginationResponseDTO response = productService.getProducts(page, size, sort);
       return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        var product = repository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> categories = Arrays.stream(Categories.values())
                .map(category -> new CategoryDTO(category.name(), category.getCategory()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(categories); // Return them as the response
    }

    @PostMapping
    public ResponseEntity registerProduct(@RequestBody @Validated RequestProduct data){

        Product newProduct = new Product(data);

        repository.save(newProduct);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Produto cadastrado com sucesso!");

        return ResponseEntity.ok(response);

    }

    @PutMapping
    @Transactional
    public ResponseEntity updateProduct(@RequestBody @Validated RequestProduct data){
        Optional<Product> optionalProduct = repository.findById(data.id());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(data.name());
            product.setPriceInCents(data.priceInCents());
            product.setDescription(data.description());

            product.setCategory(data.category());

            return ResponseEntity.ok(product);
        } else {
            throw new EntityNotFoundException();
        }

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteProduct(@PathVariable String id){
        Optional<Product> optionalProduct = repository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }



}
