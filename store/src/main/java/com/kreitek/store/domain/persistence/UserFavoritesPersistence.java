package com.kreitek.store.domain.persistence;

import com.kreitek.store.domain.entity.UserFavorites;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserFavoritesPersistence {
    List<UserFavorites> getAllFavoritesByUserId(Long userId);
    Page<UserFavorites> findAllByUserId(Pageable pageable, Long userId);
    Optional<UserFavorites> getFavoriteById(Long userFavoritesId);
    UserFavorites saveFavorite(UserFavorites userFavorites);
    void deleteFavorite(Long userFavoritesId);
}
