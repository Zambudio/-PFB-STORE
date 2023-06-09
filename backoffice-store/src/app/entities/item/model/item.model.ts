export class Item {
    id: number | undefined;
    name: string;
    price: number;
    categoryId?: number;
    categoryName?: string;
    description?:string;
    image?: string;
    isFavorite?: boolean;

  constructor(
    id: number | undefined,
    name: string,
    price: number,
    categoryId?: number,
    categoryName?: string,
    description?: string, 
    image?: string,
    isFavorite?: boolean
  ) {
    this.id = id
    this.name = name
    this.price = price
    this.categoryId = categoryId
    this.categoryName = categoryName
    this.description = description
    this.image = image
    this.isFavorite = isFavorite;
  }    
}