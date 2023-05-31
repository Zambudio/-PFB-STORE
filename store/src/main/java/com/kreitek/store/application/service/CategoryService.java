package com.kreitek.store.application.service;


import com.kreitek.store.application.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CategoryService {

    List<CategoryDTO> getAllCategories();
    Optional<CategoryDTO> getCategoryById(Long categoryId);
    CategoryDTO saveCategory(CategoryDTO category);
    void deleteCategory(Long categoryId);
    List<CategoryDTO> getAllCategoriesByName(String partialName);
}
