package com.kreitek.store.application.mapper;

import com.kreitek.store.application.dto.UserFavoritesDTO;
import com.kreitek.store.domain.entity.UserFavorites;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ItemMapper.class})
public interface UserFavoritesMapper extends EntityMapper<UserFavoritesDTO, UserFavorites> {
    @Override
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "itemId", target = "item.id")
    UserFavorites toEntity(UserFavoritesDTO dto);

    @Override
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "item.id", target = "itemId")
    UserFavoritesDTO toDto(UserFavorites entity);
}
