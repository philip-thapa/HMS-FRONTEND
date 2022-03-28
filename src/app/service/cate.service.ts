import { Injectable } from '@angular/core';
import {baseUrl} from "../urlHelper";
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CateService {

  header = new HttpHeaders()
      .set('Authorization', 'Token '+JSON.parse(localStorage.getItem('token')||'{}'))

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      
  }

  getAllRoomCate(){
    return this.http.get(`${baseUrl}roomcate/`, {headers: this.header})
  }

  addRoomCate(roomCate:any){
    return this.http.post(`${baseUrl}roomcate/create/`, roomCate, {headers: this.header})
  }

  updateRoomCate(roomCateId: number, roomCate:any){
    return this.http.put(`${baseUrl}roomcate/${roomCateId}/`, roomCate, {headers: this.header})
  }

  deleteRoomCate(roomCateId: number){
    return this.http.delete(`${baseUrl}roomcate/${roomCateId}/`, {headers: this.header})
  }

  getRoomCate(roomCateId: number){
    return this.http.get(`${baseUrl}roomcate/${roomCateId}/`, {headers: this.header})
  }

  getAllRoomsOfRoomCate(roomCateId:number){
    return this.http.get(`${baseUrl}roomcate/${roomCateId}/rooms/`, {headers: this.header})
  }
}
