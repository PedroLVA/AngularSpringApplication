package com.example.demo.domain.product;

import lombok.Data;

import java.util.List;

public record PaginationResponseDTO(int currentPage, int totalPages, long totalElements, List<Product> content, boolean last) {

}
