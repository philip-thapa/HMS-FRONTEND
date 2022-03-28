import { Injectable } from '@angular/core';
import {baseUrl} from "../urlHelper";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  response!: any
  header!: any
  constructor(private http: HttpClient, private authService: AuthService) {
    this.header = new HttpHeaders().set('Authorization', 'Token '+JSON.parse(localStorage.getItem('token') || '{}'))
    localStorage.getItem("token")
  }

  getAvaiableRoom(roomCateId:number){
    return this.http.get(`${baseUrl}bookings/roomCate/${roomCateId}/`, {headers: this.header})
  }

  getAllBookings(){
      return this.http.get(`${baseUrl}bookings/`, {headers: this.header})
  }

  createBooking(booking:any){
    return this.http.post(`${baseUrl}booking/create/`, booking, {headers: this.header})
  }

  getMyBookings(userId:number) : Observable<any>{
      return this.http.get(`${baseUrl}bookings/mybooking/${userId}/`, {headers: this.header})
  }

  getBookingDetail(bookingId: number){
    if(this.authService.isAuthenticated()){
      return this.http.get(`${baseUrl}mybooking/${bookingId}/`, {headers: this.header})
    }
    return null
  }

  cancelBooking(bookingId:number){
    return this.http.get(`${baseUrl}booking/cancel/${bookingId}/`, {headers: this.header})
  }

  updateBooking(bookingId:number, booking:any){
    return this.http.put(`${baseUrl}booking/mybooking/${bookingId}/`, booking, {headers: this.header})
  }

  searchBooking(searchInput:any){
    return this.http.get(`${baseUrl}bookings/search/`, {headers: this.header, params:{searchInput}})
  }
}
