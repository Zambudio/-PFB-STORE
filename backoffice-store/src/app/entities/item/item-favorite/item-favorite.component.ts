import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';
import { ItemService } from '../service/item.service';
import { User } from 'src/app/login/model/user.model';
import { Item } from '../model/item.model';
import { ItemFavorite } from '../model/itemfavorite.model';
import { ItemListComponent } from '../item-list/item-list.component';
import { CartItem } from 'src/app/cart/model/cartItem.model';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-item-favorite',
  templateUrl: './item-favorite.component.html',
  styleUrls: ['./item-favorite.component.scss']
})
export class ItemFavoriteComponent {

  user = this.getUser();
  favoriteItems: ItemFavorite[] = [];
  items: Item[] = [];
  cartItems: CartItem[] = [];

  constructor(private loginService: LoginService,
              private itemService: ItemService,
              private cartService: CartService) {}

  
  private getUser(): User {
    const user = this.loginService.getUser();
    return user;
  }

  ngOnInit(): void {
    this.loadItemsFavorites();
    this.loadItemsCart();
  }

  private loadItemsFavorites(): void {
    this.itemService.getAllFavoritesByUserId(this.user.id).subscribe(
      (favorites) => {
        this.favoriteItems = favorites;

        for(let favorite of this.favoriteItems) {
          this.itemService.getItemById(favorite.itemId).subscribe(
            (item) => {
              this.items.push(item);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public removeFromFavorite(itemId: number): void {
    const favorite = this.favoriteItems.find(item => item.itemId === itemId);
    if (favorite) {
      this.itemService.deleteFavorite(favorite.id!).subscribe(
        (response) => {
          this.favoriteItems = this.favoriteItems.filter(item => item.itemId !== itemId);
          this.items = this.items.filter(item => item.id !== itemId);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  public isFavorite(itemId: number): boolean {
    return this.favoriteItems.some(favorite => favorite.itemId === itemId);
  }

  public loadItemsCart(): void {
    this.cartService.getCartItems(this.user!.id).subscribe(
      (itemsCart) => {
        this.cartItems = itemsCart;
      },
      (error) => {
        console.error(error);
      }
    );
  } 

  public addToCart(itemId: number): void {
    let item = this.items.find(item => item.id === itemId);
    if(this.cartItems.some(item => item.itemId === itemId)){
      let cartItem = this.cartItems.find(cartItem => cartItem.itemId === itemId);
      let quantity = cartItem!.quantity + 1;
      this.cartService.updateCartItemQuantity(cartItem!.id!, quantity).subscribe(
        (itemCart) => {
          cartItem!.quantity = quantity;
          alert(item?.name + " agregado al carrito");
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      const cartItem: CartItem = {
        id: undefined,
        userId: this.user!.id, 
        itemId: itemId,
        quantity: 1
      };
      this.cartService.addCartItem(cartItem).subscribe(
        (cartItem) => {
          this.cartItems.push(cartItem);
          alert(item?.name + " agregado al carrito");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //public addToCart(itemId: number): void {
  //  this.itemList.addToCart(itemId);
  //}



}
