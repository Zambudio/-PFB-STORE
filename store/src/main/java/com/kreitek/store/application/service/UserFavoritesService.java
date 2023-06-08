package com.kreitek.store.application.service;

import com.kreitek.store.application.dto.UserFavoritesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserFavoritesService {
    List<UserFavoritesDTO> getAllFavoritesByUserId(Long userId);
    UserFavoritesDTO saveFavorite(UserFavoritesDTO userFavoritesDTO);
    void deleteFavorite(Long userFavoritesId);
    Page<UserFavoritesDTO> getFavoritesByUserIdPaged(Long userId, Pageable pageable);
    Optional<UserFavoritesDTO> getFavoriteById(Long userFavoritesId);
}
