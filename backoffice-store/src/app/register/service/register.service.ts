import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../model/userRegister.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public register(user: UserRegister): Observable<UserRegister> {
    let urlEndpoint: string = "http://localhost:8080/store/users";
    return this.http.post<UserRegister>(urlEndpoint, user);
  }

}
