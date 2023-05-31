package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.ItemDTO;
import com.kreitek.store.application.mapper.ItemMapper;
import com.kreitek.store.application.service.ItemService;
import com.kreitek.store.domain.entity.Item;
import com.kreitek.store.domain.persistence.ItemPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemPersistence persistence;
    private final ItemMapper mapper;

    @Autowired
    public ItemServiceImpl(ItemPersistence persistence, ItemMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public List<ItemDTO> getAllItems() {
        List<Item> items = this.persistence.getAllItems();
        return this.mapper.toDto(items);
    }

    @Override
    public List<ItemDTO> getAllItemsByCategory(Long categoryId) {
        List<Item> items = this.persistence.getAllItemsByCategory(categoryId);
        return this.mapper.toDto(items);
    }

    @Override
    public Optional<ItemDTO> getItemById(Long itemId) {
        return this.persistence.getItemById(itemId).map(mapper::toDto);
    }

    @Override
    public ItemDTO saveItem(ItemDTO itemDTO) {
        Item itemSaved = this.persistence.saveItem(this.mapper.toEntity(itemDTO));
        return this.mapper.toDto(itemSaved);
    }

    @Override
    public void deleteItem(Long itemId) {
        this.persistence.deleteItem(itemId);
    }

    @Override
    public Page<ItemDTO> getItemsByCriteriaStringPaged(Pageable pageable, String filter) {
        Page<Item> itemPage = this.persistence.findAll(pageable, filter);
        return itemPage.map(mapper::toDto);
    }
}
