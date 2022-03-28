import { Injectable } from '@angular/core';
import { baseUrl } from '../urlHelper'
import {HttpClient} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(){
    const token: string = JSON.parse(localStorage.getItem("token") || '{}');
    return token;
  }

  getUserId(){
    const user = JSON.parse(localStorage.getItem("user")|| '{}');
    const userId:number = user.id;
    return userId;
  }

  getUserName(){
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user.userName + " "+user.lastName
  }

  getUserEmail(){
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user.email
  }

  isAdmin(){
    const details = JSON.parse(localStorage.getItem('user') || '{}');
    if(details.is_staff == true)
      return true;
    return false
  }

  isUser(){
    const details = JSON.parse(localStorage.getItem('user') || '{}');
    if(details.is_staff == false)
      return true;
    return false
  }


  isAuthenticated() {
    if(typeof window == undefined){
      return false
    }
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  register(user:any){
    return this.http.post(`${baseUrl}register/`, user);
  }

  login(user:any){
    return this.http.post(`${baseUrl}login/`, user);
  }

  logout(id:Number){
    return this.http.get(`${baseUrl}logout/${id}/`);
  }
}
