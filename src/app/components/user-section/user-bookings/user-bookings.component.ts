import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {IdValidator, DatesCompare} from "../../../CustomValidators/booking-form-validaror"
import { BookingService } from 'src/app/service/booking.service';
import { distinctUntilChanged } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  private sub: any;
  id!: number
  roomCateName!: string
  username!: string
  userName!: string
  userEmail!: string
  bookingForm!: FormGroup
  submitted: boolean = false

  today: any
  next_today: any

  roomNo!: number

  constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private formBuilder: FormBuilder, private bookingService: BookingService, private toastr: ToastrService) {
    this.sub = this.router.queryParams.subscribe(params => {
      this.id = params["id"];
      this.bookingService.getAvaiableRoom(this.id)
      .subscribe(response=>{
        const {error}:any = response
        if(error){
          toastr.error("ROOM NOT AVAILABLE")
          route.navigate(["/home"])
        }else{
          const {roomId}: any = response
          this.roomNo = roomId
        }
      })
      this.roomCateName = params["name"]
      this.userName = this.authService.getUserName()
      this.userEmail = this.authService.getUserEmail()
    });
  }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
      this.route.navigate(["/signin"])

      this.today = new Date().toISOString().split('T')[0];
      document.getElementsByName("check_in")[0].setAttribute('min', this.today);  

      this.next_today = new Date().toISOString().split('T')[0];
      document.getElementsByName("check_out")[0].setAttribute('min', this.today);  
  
        this.bookingForm = this.formBuilder.group({
          guest:[this.authService.getUserId()],
          roomCategory: [this.roomCateName, Validators.required],
          no_of_adults: [1, [Validators.required, Validators.max(2)]],
          no_of_children: [0, [Validators. required, Validators.max(2)]],
          check_in: [this.today, [Validators.required]],
          check_out: [this.next_today, [Validators.required]],
          id_proof: ["", [Validators.required]],
          id_proof_number: ["", [Validators.required]],
          phone_no:["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        }, {
            validator: IdValidator('id_proof', 'id_proof_number'),
        })
  }

  get helper(){
    return this.bookingForm.controls;
  }

  dateChangeHandler(e: any){
    let date = e.target.value;
    document.getElementsByName("check_out")[0].setAttribute('min', date)
    // if(this.today < date)
    // document.getElementsByName("check_out")[0]
    if(date > (<HTMLInputElement>document.getElementsByName("check_out")[0]).value){
      // console.log("GREATER")
      (<HTMLInputElement>document.getElementsByName("check_out")[0]).value = ''
    }
  }

  onSubmit(){
    this.submitted = true
    console.table(this.bookingForm)
      if(this.bookingForm.invalid){
      return
    }
    this.bookingService.createBooking(this.bookingForm.value)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: (response)=>{
        const {error}:any = response
        if(error != null){
          this.toastr.error('Booking Failed');
          this.route.navigate(['/home'])
        }
        this.toastr.success('Booking success')
        this.route.navigate(['/home'])
      },
      error: (e) => console.log(e)
    })
  }

  onReset(){
    this.submitted = false;
    this.bookingForm.reset()
  }
}
