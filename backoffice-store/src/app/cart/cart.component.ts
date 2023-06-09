import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { Item } from '../entities/item/model/item.model';
import { ItemService } from '../entities/item/service/item.service';
import { CartItem } from './model/cartItem.model';
import { CartService } from './service/cart.service';
import { Order } from '../order/model/order.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  user = this.loginService.getUser();
  cartItems: CartItem[] = [];
  items: Item[] = [];
  order: Order | null = null;

  constructor(private loginService: LoginService,
              private itemService: ItemService,
              private cartService: CartService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadItemsCart();
  }

  private loadItemsCart(): void {
    this.cartService.getCartItems(this.user.id).subscribe(
      (itemsCart) => {
        this.cartItems = itemsCart;

        for(let itemCar of this.cartItems){
          this.itemService.getItemById(itemCar.itemId).subscribe(
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

  private findItem(itemId: number): Item | undefined {
      let item = this.items.find(item => item.id === itemId);
      return item;
  }

  private findItemCart(itemId: number): CartItem | undefined {
    let cartItem = this.cartItems.find(cartItem => cartItem.itemId === itemId);
    return cartItem;
  }

  public getQuantity(itemId: number): number {
    let cartItem = this.findItemCart(itemId);
    return cartItem!.quantity;
  }

  public getTotalPrice(itemId: number): number {
    let item = this.findItem(itemId);
    let cartItem = this.findItemCart(itemId);
    let total = item!.price * cartItem!.quantity;
    return parseFloat(total.toFixed(2));
  }

  public addCartItemQuantity(itemId: number): void {
    let item = this.findItem(itemId);
    let cartItem = this.findItemCart(itemId);
    let quantity = this.getQuantity(item!.id!) + 1;
    this.cartService.updateCartItemQuantity(cartItem!.id!,quantity).subscribe(
      (itemCart) => {
        cartItem!.quantity = quantity;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public subtractCartItemQuantity(itemId: number): void {
    let item = this.findItem(itemId);
    let cartItem = this.findItemCart(itemId);
    let quantity = this.getQuantity(item!.id!) - 1;
    this.cartService.updateCartItemQuantity(cartItem!.id!,quantity).subscribe(
      (itemCart) => {
        cartItem!.quantity = quantity;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public removeCartItem(itemId: number): void{
    let cartItem = this.findItemCart(itemId);
    this.cartService.deleteCartItem(cartItem!.id!).subscribe(
      (remove) => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.itemId !== itemId);
        this.items = this.items.filter(item => item.id !== itemId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public totalPriceCart(): number {
    let totalprice: number = 0;
    for(let cartItem of this.cartItems){
      totalprice += this.getTotalPrice(cartItem.itemId);
    }
    return parseFloat(totalprice.toFixed(2));
  }

  public orderCart(): void {
    this.order = {
      id: undefined,
      userId: this.user.id,
      items: this.items,
      date: new Date()
    };
                                        /*  Borrar los items del carro
                                        
    for(let itemCart of this.cartItems){
      this.cartService.deleteCartItem(itemCart.id!).subscribe(
        (response) => {
          this.cartItems = this.cartItems.filter(cartService => cartService.id !== itemCart.id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    */
    this.cartService.setOrder(this.order);
    this.router.navigate(['order']);
  }




}
