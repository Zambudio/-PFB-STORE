package com.kreitek.store.infrastucture.rest;

import com.kreitek.store.application.dto.UserFavoritesDTO;
import com.kreitek.store.application.service.UserFavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserFavoritesRestController {

    private final UserFavoritesService userFavoritesService;

    @Autowired
    public UserFavoritesRestController(UserFavoritesService userFavoritesService) {
        this.userFavoritesService = userFavoritesService;
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}/favorites", produces = "application/json")
    ResponseEntity<List<UserFavoritesDTO>> getAllFavoritesByUserId(@PathVariable Long userId) {
        List<UserFavoritesDTO> userFavorites = this.userFavoritesService.getAllFavoritesByUserId(userId);
        return new ResponseEntity<>(userFavorites, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}/favorites-paged", produces = "application/json")
    ResponseEntity<Page<UserFavoritesDTO>> getFavoritesByUserIdPaged(@PathVariable Long userId, Pageable pageable) {
        Page<UserFavoritesDTO> userFavoritesPage = this.userFavoritesService.getFavoritesByUserIdPaged(userId, pageable);
        return new ResponseEntity<>(userFavoritesPage, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/favorites", produces = "application/json", consumes = "application/json")
    ResponseEntity<UserFavoritesDTO> saveFavorite(@RequestBody UserFavoritesDTO userFavoritesDTO) {
        userFavoritesDTO = this.userFavoritesService.saveFavorite(userFavoritesDTO);
        return new ResponseEntity<>(userFavoritesDTO, HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/favorites/{userFavoritesId}")
    ResponseEntity<?> deleteFavorite(@PathVariable Long userFavoritesId) {
        this.userFavoritesService.deleteFavorite(userFavoritesId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/favorites/{userFavoritesId}")
    ResponseEntity<UserFavoritesDTO> getFavoriteById(@PathVariable Long userFavoritesId) {
        Optional<UserFavoritesDTO> userFavorite = this.userFavoritesService.getFavoriteById(userFavoritesId);
        if (userFavorite.isPresent()) {
            return new ResponseEntity<>(userFavorite.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
