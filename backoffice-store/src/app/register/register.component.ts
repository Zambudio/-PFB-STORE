import { Component } from '@angular/core';
import { RegisterService } from './service/register.service';
import { UserRegister } from './model/userRegister.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nickname: string = '';
  password: string = '';
  username: string = '';
  surname: string = '';
  phonenumber: string = '';
  email: string = '';
  registerError: boolean = false;
  passwordConfirmation: string = '';

  constructor(private registerService: RegisterService,
              private router: Router){}

  register() {

    if(this.nickname.includes(' ')) {
      alert('El nombre de usuario no puede contener espacios');
      return;
    }
    
    if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(this.password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluir una letra minúscula, una mayúscula y un número');
      return;
    }
    
    if(this.password !== this.passwordConfirmation) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if(!/^[0-9]+$/.test(this.phonenumber) || this.phonenumber.length < 9) {
      alert('El número de teléfono debe ser un número y tener al menos 9 dígitos');
      return;
    }
    
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      alert('Por favor, introduce un email válido');
      return;
    }

    let user: UserRegister = {
      nickname: this.nickname,
      password: this.password,
      username: this.username,
      surname: this.surname,
      phonenumber: this.phonenumber,
      email: this.email
    };

    this.registerService.register(user).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        console.log(response);
      },
      (error) => {
        this.registerError = true;
        console.log(error);
      }
    );
  }

}
