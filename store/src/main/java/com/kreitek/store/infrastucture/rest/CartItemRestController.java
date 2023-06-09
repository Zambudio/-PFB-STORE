package com.kreitek.store.infrastucture.rest;

import com.kreitek.store.application.dto.CartItemDTO;
import com.kreitek.store.application.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/cart")
public class CartItemRestController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemRestController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @CrossOrigin
    @GetMapping(value = "/{userId}", produces = "application/json")
    ResponseEntity<List<CartItemDTO>> getCartItems(@PathVariable Long userId) {
        List<CartItemDTO> cartItems = this.cartItemService.getCartItems(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/", produces = "application/json", consumes = "application/json")
    ResponseEntity<CartItemDTO> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        CartItemDTO cartItem = this.cartItemService.addCartItem(cartItemDTO.getUserId(), cartItemDTO.getItemId(), cartItemDTO.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{cartItemId}")
    ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        this.cartItemService.removeCartItem(cartItemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping(value = "/{cartItemId}", produces = "application/json")
    ResponseEntity<CartItemDTO> updateCartItemQuantity(@PathVariable Long cartItemId, @RequestParam Integer quantity) {
        CartItemDTO updatedCartItem = this.cartItemService.updateCartItemQuantity(cartItemId, quantity);
        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }
}

