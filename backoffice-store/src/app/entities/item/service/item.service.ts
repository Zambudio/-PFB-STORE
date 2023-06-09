import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';
import { ItemFavorite } from '../model/itemfavorite.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  public getAllItems(page: number, size: number, sort: string, filters?: string): Observable<Item[]> {
    let urlEndpoint: string = "http://localhost:8080/store/items?page=" + page + "&size=" + size + "&sort=" + sort;
    if (filters) {
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    return this.http.get<Item[]>(urlEndpoint);
  }

  public deleteItem(itemIdToDelete: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/items/" + itemIdToDelete;
    return this.http.delete<any>(urlEndpoint);

  }

  public getItemById(itemId: number): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/" + itemId;
    return this.http.get<Item>(urlEndpoint);
  }

  public insert(item: Item): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/";
    return this.http.post<Item>(urlEndpoint, item);
  }

  public update(item: Item): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/";
    return this.http.patch<Item>(urlEndpoint, item);
  }

  // metodos favoritos |->

  public getAllFavoritesByUserId(userId: number): Observable<ItemFavorite[]> {
    let urlEndpoint: string  = `http://localhost:8080/store/users/${userId}/favorites`;
    return this.http.get<ItemFavorite[]>(urlEndpoint);
  }

  public getFavoritesByUserIdPaged(userId: number, page: number, size: number): Observable<ItemFavorite[]> {
    let urlEndpoint: string  = `http://localhost:8080/store/users/${userId}/favorites-paged?page=${page}&size=${size}`;
    return this.http.get<ItemFavorite[]>(urlEndpoint);
  }

  public saveFavorite(itemFavorite: ItemFavorite): Observable<ItemFavorite> {
    const urlEndpoint: string  = "http://localhost:8080/store/favorites";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ItemFavorite>(urlEndpoint, itemFavorite, httpOptions);
  }

  public deleteFavorite(userFavoritesId: number): Observable<any> {
    let urlEndpoint: string  = `http://localhost:8080/store/favorites/${userFavoritesId}`;
    return this.http.delete(urlEndpoint);
  }

  public markAsFavorite(itemId: number): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/" + itemId;
    return this.http.patch<Item>(urlEndpoint, {isFavorite: true});
  }


}
