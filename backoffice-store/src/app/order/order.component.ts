import { Component } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { AdressOrder } from './model/adressOrder.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  firstName: string = '';
  lastName: string = '';
  street: string = '';
  additionalInfo: string = '';
  postalCode: string = '';
  city: string = '';
  phoneNumber: string = '';
  addressError: boolean = false;

  order = this.cartService.getOrder();
  items = this.order.items;
  adress : AdressOrder | null = null;

  constructor(private cartService: CartService) {}

  confirm() {
    let adressComplete = this.firstName + " " + this.lastName + " " + this.street + " " + this.additionalInfo +
    " " + this.postalCode + " " + this.city + " " + this.phoneNumber;

    this.adress = {
      adress : adressComplete,
      order : this.order
    };

  }

}
