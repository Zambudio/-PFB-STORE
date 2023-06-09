package com.kreitek.store.application.service;

import com.kreitek.store.application.dto.CartItemDTO;

import java.util.List;

public interface CartItemService {
    List<CartItemDTO> getCartItems(Long userId);
    CartItemDTO addCartItem(Long userId, Long itemId, Integer quantity);
    CartItemDTO updateCartItemQuantity(Long cartItemId, Integer quantity);
    void removeCartItem(Long cartItemId);
}
