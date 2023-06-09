export class CartItem {
    id: number | undefined;
    userId: number;
    itemId: number;
    quantity: number;

  constructor(
    id: number | undefined, 
    userId: number, 
    itemId: number, 
    quantity: number
) {
    this.id = id
    this.userId = userId
    this.itemId = itemId
    this.quantity = quantity
  }    
}