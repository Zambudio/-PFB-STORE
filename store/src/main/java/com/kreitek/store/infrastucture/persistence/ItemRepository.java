package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>,
        JpaSpecificationExecutor<Item> {
    List<Item> findAllByCategoryId(Long id);

}
