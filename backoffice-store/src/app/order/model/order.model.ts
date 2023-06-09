import { Item } from 'src/app/entities/item/model/item.model';

export class Order{
    id: number | undefined;
    userId: number;
    items: Item[] = [];
    date: Date;

  constructor(id: number | undefined, userId: number,items: Item[], date: Date) {
    this.id = id
    this.userId = userId
    this.items = items
    this.date = date
  }
  
}