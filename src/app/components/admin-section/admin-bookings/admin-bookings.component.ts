import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  bookingList:any = []
  searchBookingForm!: FormGroup
  isBookingListEmpty: boolean = false
  constructor(private authServive: AuthService, private router: Router, private bookingService: BookingService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if(!this.authServive.isAuthenticated())
      this.router.navigate(["/signin"])
    if(this.authServive.isAdmin()){
      this.bookingService.getAllBookings()
      .pipe(distinctUntilChanged())
      .subscribe({
        next:(response)=>{
          const {bookings}:any = response
          this.bookingList = bookings
        },
        error: (error)=>console.log(error)
      })
    }

    this.searchBookingForm = this.formBuilder.group({
      searchBookingInput: ['']
    })
  }

  onSearchSubmit(){
    this.bookingService.searchBooking(this.searchBookingForm.controls['searchBookingInput'].value)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response=>{
        const {bookings}:any = response
        this.bookingList = bookings
        if(this.bookingList.length == 0)
          this.isBookingListEmpty = true
        else
          this.isBookingListEmpty = false
      },
      error: e=>console.log(e)
    })
  }

  cancelBooking(bookingId:number){
    if(this.authServive.isAdmin()){
      this.bookingService.cancelBooking(bookingId)
      .pipe(distinctUntilChanged())
      .subscribe({
        next:(response)=>{
          // this.bookingList.filter((booking:any)=>booking.id !== bookingId)
          this.ngOnInit()
        },
        error: e => console.log(e)
      })
    }
  }
}
