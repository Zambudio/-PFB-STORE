package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.UserFavorites;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFavoritesRepository extends JpaRepository<UserFavorites, Long> {
    List<UserFavorites> findAllByUserId(Long id);
    Page<UserFavorites> findAllByUserId(Long id, Pageable pageable);
}
