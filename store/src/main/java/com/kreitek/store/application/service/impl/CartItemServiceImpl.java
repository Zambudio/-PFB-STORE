package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.CartItemDTO;
import com.kreitek.store.application.mapper.CartItemMapper;
import com.kreitek.store.application.service.CartItemService;
import com.kreitek.store.domain.entity.CartItem;
import com.kreitek.store.domain.persistence.CartItemPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemPersistence persistence;
    private final CartItemMapper mapper;

    @Autowired
    public CartItemServiceImpl(CartItemPersistence persistence, CartItemMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public List<CartItemDTO> getCartItems(Long userId) {
        List<CartItem> cartItems = this.persistence.getCartItems(userId);
        return mapper.toDto(cartItems);
    }

    @Override
    public CartItemDTO addCartItem(Long userId, Long itemId, Integer quantity) {
        CartItem cartItem = this.persistence.addCartItem(userId, itemId, quantity);
        return this.mapper.toDto(cartItem);
    }

    @Override
    public void removeCartItem(Long cartItemId) {
        this.persistence.removeCartItem(cartItemId);
    }

    @Override
    public CartItemDTO updateCartItemQuantity(Long cartItemId, Integer quantity) {
        CartItem updatedCartItem = this.persistence.updateCartItemQuantity(cartItemId, quantity);
        return this.mapper.toDto(updatedCartItem);
    }
}
