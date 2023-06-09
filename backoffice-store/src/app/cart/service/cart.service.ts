import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cartItem.model';
import { Order } from 'src/app/order/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private order : Order | null = null;

  constructor(private http: HttpClient) { }

  public getCartItems(userId: number): Observable<CartItem[]> {
    let urlEndpoint: string = `http://localhost:8080/store/cart/${userId}`;
    return this.http.get<CartItem[]>(urlEndpoint);
  }

  public addCartItem(cartItem: CartItem): Observable<CartItem> {
    let urlEndpoint: string = "http://localhost:8080/store/cart/";
    return this.http.post<CartItem>(urlEndpoint,cartItem);
  }

  public deleteCartItem(cartItemId: number): Observable<any> {
    let urlEndpoint: string = `http://localhost:8080/store/cart/${cartItemId}`;
    return this.http.delete<any>(urlEndpoint);
  }

  public updateCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    let urlEndpoint: string = `http://localhost:8080/store/cart/${cartItemId}` + "?quantity=" + quantity;
    return this.http.put<any>(urlEndpoint,{});
  }

  public setOrder(order: Order): void {
    this.order = order;
  }

  public getOrder(): Order {
    return this.order!;
  }

}
