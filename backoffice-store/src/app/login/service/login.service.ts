import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { User } from '../model/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Para mantener el estado del usuario
  userSubject = new BehaviorSubject<string | null>(null); 
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Carga inicial del usuario desde localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser).nickname);
    }
  }

  setUser(user: User): void {
    // Guarda el usuario en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user.nickname);
  }

  getUser(): User {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
  }


  clearUser(): void {
    // Borrar usuario del localStorage
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  public getUserByUsername(username: string): Observable<User> {
    
    let urlEndpoint: string = "http://localhost:8080/store/users/" + username;

    return this.http.get<User>(urlEndpoint);
    
  }

}
