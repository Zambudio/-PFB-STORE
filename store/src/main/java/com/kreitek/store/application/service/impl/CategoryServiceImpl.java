package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.CategoryDTO;
import com.kreitek.store.application.mapper.CategoryMapper;
import com.kreitek.store.application.service.CategoryService;
import com.kreitek.store.domain.entity.Category;
import com.kreitek.store.domain.persistence.CategoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryPersistence persistence;
    private final CategoryMapper mapper;

    @Autowired
    public CategoryServiceImpl(CategoryPersistence persistence, CategoryMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = this.persistence.getAllCategories();
        return mapper.toDto(categories);
    }

    @Override
    public Optional<CategoryDTO> getCategoryById(Long categoryId) {
        return this.persistence.getCategoryById(categoryId).map(mapper::toDto);
    }

    @Override
    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        Category category = this.persistence.saveCategory(this.mapper.toEntity(categoryDTO));
        return this.mapper.toDto(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        this.persistence.deleteCategory(categoryId);
    }

    @Override
    public List<CategoryDTO> getAllCategoriesByName(String partialName) {
        List<Category> categories = this.persistence.getCategoriesByName(partialName);
        return mapper.toDto(categories);
    }
}
