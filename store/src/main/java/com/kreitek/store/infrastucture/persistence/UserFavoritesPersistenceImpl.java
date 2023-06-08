package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.UserFavorites;
import com.kreitek.store.domain.persistence.UserFavoritesPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserFavoritesPersistenceImpl implements UserFavoritesPersistence {

    private final UserFavoritesRepository userFavoritesRepository;

    @Autowired
    public UserFavoritesPersistenceImpl(UserFavoritesRepository userFavoritesRepository) {
        this.userFavoritesRepository = userFavoritesRepository;
    }

    @Override
    public List<UserFavorites> getAllFavoritesByUserId(Long userId) {
        return this.userFavoritesRepository.findAllByUserId(userId);
    }

    @Override
    public Page<UserFavorites> findAllByUserId(Pageable pageable, Long userId) {
        return this.userFavoritesRepository.findAllByUserId(userId, pageable);
    }

    @Override
    public Optional<UserFavorites> getFavoriteById(Long userFavoritesId) {
        return this.userFavoritesRepository.findById(userFavoritesId);
    }

    @Override
    public UserFavorites saveFavorite(UserFavorites userFavorites) {
        return this.userFavoritesRepository.save(userFavorites);
    }

    @Override
    public void deleteFavorite(Long userFavoritesId) {
        this.userFavoritesRepository.deleteById(userFavoritesId);
    }

}
