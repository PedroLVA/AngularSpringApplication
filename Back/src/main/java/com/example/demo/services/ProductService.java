package com.example.demo.services;

import com.example.demo.domain.product.PaginationResponseDTO;
import com.example.demo.domain.product.Product;
import com.example.demo.domain.product.RequestProduct;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.ProductRepositoryPage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    public Product updateProduct(RequestProduct data){
        Optional<Product> optionalProduct = repository.findById(data.id());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(data.name());
            product.setPriceInCents(data.priceInCents());
            product.setDescription(data.description());
            product.setCategory(data.category());

            return product;
        }
        else{
            throw new EntityNotFoundException();
        }
    }

    public Map<String, String> registerProduct(RequestProduct data){
        Map<String, String> response = new HashMap<>();
        Product newProduct = new Product(data);

        repository.save(newProduct);
        response.put("message", "Produto cadastrado com sucesso!");

        return response;
    }

    public void deleteProduct(String id){
        Optional<Product> optionalProduct = repository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(false);
        } else {
            throw new EntityNotFoundException();
        }
    }

}
