import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { NgForm } from '@angular/forms';
import { User } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  user: User | undefined;
  loginError: boolean = false;
  userNotFound: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  public getUser(username: string): void {
    this.loginService.getUserByUsername(username).subscribe({
      next: (userRequest) => {
        this.user = userRequest;
        this.checkCredentials(username, this.loginPassword);
      },
      error: (err) => {
        if (err.status === 404) {
          console.log('El usuario no existe');
          this.userNotFound = true;
        } else {
          this.handleError(err);
        }
      },
    });
  }

  public login(): void {
    this.getUser(this.loginUsername);
  }

  private checkCredentials(username: string, password: string): void {
    if (this.user?.nickname == username && this.user.password == password) {
      console.log('Inicio de sesión exitoso');
      this.loginService.setUser(this.user);
      this.router.navigate(['']);
    } else {
      console.log('Credenciales inválidas');
      this.loginError = true;
      this.userNotFound = false;
    }
  }

  private handleError(error: any) {
    // lo que queramos
  }
}
