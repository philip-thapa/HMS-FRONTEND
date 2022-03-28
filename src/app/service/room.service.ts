import { Injectable } from '@angular/core';
import {baseUrl} from "../urlHelper";
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  header = new HttpHeaders()
      .set('Authorization', 'Token '+JSON.parse(localStorage.getItem('token')||'{}'))
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAllRooms() {
    return this.http.get(`${baseUrl}rooms/`, {headers: this.header})
  }

  addRoom(room:any) {
    return this.http.post(`${baseUrl}rooms/create/`, room , {headers: this.header})
  }

  updateRoom(roomId: number, roomCate:any) {
    return this.http.put(`${baseUrl}room/${roomId}/`, roomCate , {headers: this.header} )
  }

  deleteRoom(roomId: number){
    return this.http.delete(`${baseUrl}room/${roomId}/`, {headers: this.header})
  }

  getRoom(roomId: number){
    return this.http.get(`${baseUrl}room/${roomId}/`, {headers: this.header})
  }
  
}
