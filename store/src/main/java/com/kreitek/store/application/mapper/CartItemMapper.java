package com.kreitek.store.application.mapper;

import com.kreitek.store.application.dto.CartItemDTO;
import com.kreitek.store.domain.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper extends EntityMapper<CartItemDTO, CartItem> {

    @Override
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "itemId", target = "item.id")
    CartItem toEntity(CartItemDTO dto);

    @Override
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "item.id", target = "itemId")
    CartItemDTO toDto(CartItem entity);
}






