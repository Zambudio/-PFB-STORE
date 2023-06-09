import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { LoginService } from 'src/app/login/service/login.service';
import { ItemFavorite } from '../model/itemfavorite.model';
import { User } from 'src/app/login/model/user.model';
import { CartItem } from 'src/app/cart/model/cartItem.model';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

  categoryId?: number;
  title: string = "";
  items: Item[] = [];
  
  page: number = 0;
  size: number = 10;
  sort: string = "name,asc";

  first: boolean = false;
  last : boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  priceFilter?: number;

  itemIdToDelete?: number;

  favoriteItems: ItemFavorite[] = [];

  cartItems: CartItem[] = [];

  user? = this.getUserLogin();

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private loginService: LoginService,
              private cartService: CartService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("categoryId")) {
      this.categoryId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.title = "Articulos de la categoria " + this.categoryId;
    }else {
      this.title = "Lista de articulos";
    }
    this.getAllItems();
    this.loadFavorites();
    this.loadItemsCart();
  }

  public nextPage(): void {
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage(): void {
    this.page = this.page - 1;
    this.getAllItems();
  }

  public searchByFilters(): void {
    this.getAllItems();
  }

  public prepareItemToDelete(itemId: number): void {
    this.itemIdToDelete = itemId;
  }

  public deleteItem(): void {
    if (this.itemIdToDelete){
      this.itemService.deleteItem(this.itemIdToDelete).subscribe({
        next: (data) => {
          this.getAllItems();
        },
        error: (err) => {this.handleError(err)}
      })
    }
  }

  private buildFilters(): string | undefined {
    const filters: string[] = [];

    if (this.categoryId) {
      filters.push("category.id:EQUAL:" + this.categoryId);
    }

    if (this.nameFilter){
      filters.push("name:MATCH:" + this.nameFilter);
    }

    if (this.priceFilter){
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
    }

    if (filters.length > 0){

      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length-1);
      return globalFilters;

    }else{
      return undefined;
    }
  }

  private getAllItems(): void {

    const filters: string | undefined = this.buildFilters();

    this.itemService.getAllItems (this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.items = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
     },
      error: (err) => {this.handleError(err);}
    })
  }

  private handleError(error: any) {
    // lo que queramos
  }

  // |-> implementacion favoritos

  public isUserLoggedIn(): boolean {
    return this.loginService.userSubject.value !== null;
  }

  private getUserLogin(): User {
    const user = this.loginService.getUser();
    return user;
  }

  public markAsFavorite(itemId: number): void {
    if(!this.isFavorite(itemId)){
      const itemFavorite: ItemFavorite = {
        id: undefined,
        userId: this.user!.id, 
        itemId: itemId
      };
      console.log(itemFavorite);
      
      this.itemService.saveFavorite(itemFavorite).subscribe(
        (response) => {
          console.log(response);
          this.favoriteItems.push(response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.removeFromFavorite(itemId);
    }
  }
  
  public removeFromFavorite(itemId: number): void {
    const favorite = this.favoriteItems.find(item => item.itemId === itemId);
    if (favorite) {
      this.itemService.deleteFavorite(favorite.id!).subscribe(
        (response) => {
          this.favoriteItems = this.favoriteItems.filter(item => item.itemId !== itemId);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  private loadFavorites(): void{
    this.itemService.getAllFavoritesByUserId(this.user!.id).subscribe(
      (favorites) => {
        this.favoriteItems = favorites;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  public isFavorite(itemId: number): boolean {
    return this.favoriteItems.some(favorite => favorite.itemId === itemId);
  }
  
  // metodos carrito |->

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

  public getCartItems(): CartItem[] {
    return this.cartItems;
  }

}
