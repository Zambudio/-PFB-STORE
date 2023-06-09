export class User {
    id: number;
    nickname: string;
    password: string;
    username: string;
    surname: string;
    phonenumber: string;
    email: string;

  constructor(
    id: number,
    nickname: string,
    password: string, 
    username: string, 
    surname: string, 
    phonenumber: string, 
    email: string
) {
    this.id = id
    this.nickname = nickname
    this.password = password
    this.username = username
    this.surname = surname
    this.phonenumber = phonenumber
    this.email = email
  }  
}
