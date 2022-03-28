import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { distinctUntilChanged, first } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { BookingService } from 'src/app/service/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdValidator } from 'src/app/CustomValidators/booking-form-validaror';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  bookingList: any;
  totalBooking: number = 0
  email!: string

  updateBookingForm!: FormGroup
  submitted: boolean = false
  constructor(private router: Router, private authService: AuthService, private bookingService: BookingService, private formBuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.email = this.authService.getUserEmail()
    this.bookingService.getMyBookings(this.authService.getUserId())
    .pipe(first())
    // .pipe(distinctUntilChanged())
    .subscribe({
      next:(response)=>{
        console.log(response)
        const {bookings}:any = response
        this.bookingList = bookings
        this.totalBooking = this.bookingList?.length
      },
      error: e=>console.log(e)
    })
  }

  onCancel(bookingId:number){
    this.bookingService.cancelBooking(bookingId)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: response => {
          this.bookingList.filter((booking:any)=>booking.id !== bookingId)
          this.ngOnInit()
        }
      })
  }

  nvaigateToPayment(bookingId:number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "bookingId": bookingId,
      }
    };
    this.router.navigate(['booking/payement'], navigationExtras);
  }



  onUpdateBookingClick(bookingId:number){
    const booking = this.bookingList.filter((booking:any)=>booking.id == bookingId)[0]
    this.updateBookingForm = this.formBuilder.group({
      id:[bookingId],
      check_in:[booking.check_in],
      check_out: [booking.check_out],
      id_proof:[booking.id_proof],
      id_proof_number:[booking.id_proof_number, Validators.required],
      phone_no: [booking.phone_no, Validators.required]
    },{
        validator: IdValidator('id_proof', 'id_proof_number'),
      }
    )
  }

  get helper(){
    return this.updateBookingForm.controls;
  }

  onUpdateSubmit(){
    this.submitted = true
    if(this.updateBookingForm.invalid)
      return
    this.bookingService.updateBooking(this.updateBookingForm.controls['id'].value, this.updateBookingForm.value)
    .pipe(distinctUntilChanged())
    .subscribe({
      next:response=>{
        console.log(response)
        this.ngOnInit()
      },
      error: e=>console.log(e)
    })
  }
}
