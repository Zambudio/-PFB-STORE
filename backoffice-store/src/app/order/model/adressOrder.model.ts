import { Order } from 'src/app/order/model/order.model';

export class AdressOrder {
    adress: string;
    order: Order;

  constructor(adress: string, order: Order) {
    this.adress = adress
    this.order = order
  }    
}