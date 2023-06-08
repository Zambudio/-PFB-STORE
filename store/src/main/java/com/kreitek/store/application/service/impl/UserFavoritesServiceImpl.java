package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.UserFavoritesDTO;
import com.kreitek.store.application.mapper.UserFavoritesMapper;
import com.kreitek.store.application.service.UserFavoritesService;
import com.kreitek.store.domain.entity.UserFavorites;
import com.kreitek.store.domain.persistence.UserFavoritesPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoritesServiceImpl implements UserFavoritesService {

    private final UserFavoritesPersistence persistence;
    private final UserFavoritesMapper mapper;

    @Autowired
    public UserFavoritesServiceImpl(UserFavoritesPersistence persistence, UserFavoritesMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public List<UserFavoritesDTO> getAllFavoritesByUserId(Long userId) {
        List<UserFavorites> userFavorites = this.persistence.getAllFavoritesByUserId(userId);
        return this.mapper.toDto(userFavorites);
    }

    @Override
    public UserFavoritesDTO saveFavorite(UserFavoritesDTO userFavoritesDTO) {
        UserFavorites userFavoritesSaved = this.persistence.saveFavorite(this.mapper.toEntity(userFavoritesDTO));
        return this.mapper.toDto(userFavoritesSaved);
    }

    @Override
    public void deleteFavorite(Long userFavoritesId) {
        this.persistence.deleteFavorite(userFavoritesId);
    }

    @Override
    public Page<UserFavoritesDTO> getFavoritesByUserIdPaged(Long userId, Pageable pageable) {
        Page<UserFavorites> userFavoritesPage = this.persistence.findAllByUserId(pageable, userId);
        return userFavoritesPage.map(mapper::toDto);
    }

    @Override
    public Optional<UserFavoritesDTO> getFavoriteById(Long userFavoritesId) {
        return this.persistence.getFavoriteById(userFavoritesId).map(mapper::toDto);
    }
}
