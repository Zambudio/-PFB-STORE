export class ItemFavorite {
    id: number | undefined;
    userId: number;
    itemId: number;

  constructor(
    id: number | undefined, 
    userId: number, 
    itemId: number
  ) {
    this.id = id
    this.userId = userId
    this.itemId = itemId
  }
  
}