import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  username: string | null = null;

  constructor(private login: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.login.user$.subscribe(nickname  => this.username = nickname );
  }

  logout(): void {
    this.login.clearUser();
    this.router.navigate([""]);
  }

}

