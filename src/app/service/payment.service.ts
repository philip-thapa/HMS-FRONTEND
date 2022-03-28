import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../urlHelper';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  header = new HttpHeaders()
      .set('Authorization', 'Token '+JSON.parse(localStorage.getItem('token')||'{}'))
  constructor(private http: HttpClient) { }


  getPaymentDetails(bookingId:number){
    return this.http.get(`${baseUrl}payment/create/${bookingId}/`, {headers: this.header})
  }

  performPaymnet(booking:number, amount:number, status: boolean){
    let paymentDetails = {booking ,amount, status}
    return this.http.post(`${baseUrl}payment/perform/${booking}/`, paymentDetails, {headers: this.header})
  }
}
