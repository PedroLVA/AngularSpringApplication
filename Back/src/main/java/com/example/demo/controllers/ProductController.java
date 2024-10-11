package com.example.demo.controllers;

import com.example.demo.domain.product.Product;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.domain.product.RequestProduct;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(value = "sort", required = false) String sort) {


        var allProducts = repository.findAllByActiveTrue();


        if (sort != null) {
            switch (sort) {
                case "asc":
                    allProducts.sort(Comparator.comparing(Product::getPrice_in_cents)); // Price ascending
                    break;
                case "desc":
                    allProducts.sort(Comparator.comparing(Product::getPrice_in_cents).reversed()); // Price descending
                    break;
                case "old":
                    allProducts.sort(Comparator.comparing(Product::getCreatedAt)); // Older first
                    break;
                case "new":
                    allProducts.sort(Comparator.comparing(Product::getCreatedAt).reversed()); // Newer first
                    break;
            }
        }

        return ResponseEntity.ok(allProducts);
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
            product.setPrice_in_cents(data.price_in_cents());
            product.setDescription(data.description());
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
