import { EmailValidator } from "@angular/forms";

export class UserRegister {
    nickname: string;
    password: string;
    username: string;
    surname: string;
    phonenumber: string;
    email: string;

  constructor(
    nickname: string,
    password: string, 
    username: string, 
    surname: string, 
    phonenumber: string, 
    email: string
) {
    this.nickname = nickname
    this.password = password
    this.username = username
    this.surname = surname
    this.phonenumber = phonenumber
    this.email = email
  }    

}