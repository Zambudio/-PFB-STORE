package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.CartItem;
import com.kreitek.store.domain.entity.Item;
import com.kreitek.store.domain.entity.User;
import com.kreitek.store.domain.persistence.CartItemPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CartItemPersistenceImpl implements CartItemPersistence {

    private final CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    public CartItemPersistenceImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<CartItem> getCartItems(Long userId) {
        return this.cartItemRepository.findAllByUserId(userId);
    }

    @Override
    public CartItem addCartItem(Long userId, Long itemId, Integer quantity) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Item> item = itemRepository.findById(itemId);

        if (user.isPresent() && item.isPresent()) {
            CartItem cartItem = new CartItem();
            cartItem.setUser(user.get());
            cartItem.setItem(item.get());
            cartItem.setQuantity(quantity);

            return this.cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("User or Item not found");
        }
    }

    @Override
    public void removeCartItem(Long cartItemId) {
        this.cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        Optional<CartItem> optionalCartItem = this.cartItemRepository.findById(cartItemId);
        if (optionalCartItem.isPresent()) {
            CartItem cartItem = optionalCartItem.get();
            cartItem.setQuantity(quantity);
            return this.cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("CartItem not found");
        }
    }
}

