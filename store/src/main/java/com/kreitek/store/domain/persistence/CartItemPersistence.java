package com.kreitek.store.domain.persistence;

import com.kreitek.store.domain.entity.CartItem;

import java.util.List;

public interface CartItemPersistence {
    List<CartItem> getCartItems(Long userId);
    CartItem addCartItem(Long userId, Long itemId, Integer quantity);
    void removeCartItem(Long cartItemId);
    CartItem updateCartItemQuantity(Long cartItemId, Integer quantity);
}

