import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../urlHelper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header = new HttpHeaders()
  .set('Authorization', 'Token '+JSON.parse(localStorage.getItem('token')||'{}'))

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  getAllUsers(){
  return this.http.get(`${baseUrl}users/`, {headers: this.header});
  }

  getUser(userId:number){
  return this.http.get(`${baseUrl}user/${userId}/`, {headers: this.header})
  }

  searchUser(searchInput:any){
    return this.http.get(`${baseUrl}users/search/`, {headers: this.header, params:{searchInput}})
  }

  updateUserDetails(userId:number, userDetails: any){
    return this.http.put(`${baseUrl}user/${userId}/`, userDetails, {headers: this.header})
  }
}
