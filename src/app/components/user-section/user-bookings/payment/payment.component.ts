import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  sub: any;
  email!: string;
  totalDays!: number
  totalAmount!: number
  bookingId!: number
  roomRate!: number
  paymentForm!: FormGroup

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private paymentService: PaymentService, private formBuilder:FormBuilder) {
    this.sub = this.route.queryParams.subscribe(params => {
      this.bookingId = params["bookingId"];
    });
  }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
      this.router.navigate(["/signin"])
    this.email = this.authService.getUserEmail()
    this.paymentService.getPaymentDetails(this.bookingId)
    .pipe(distinctUntilChanged())
    .subscribe({
      next:response=>{
        const {error}:any = response
        if(error == null){
          const {payment_details}: any = response
          const {amount, room_rate, total_days}:any = payment_details
          this.totalAmount = amount;
          this.roomRate = room_rate;
          this.totalDays = total_days
        }
        console.log(error)
      },
      error: e=>console.log(e)
    })

    this.paymentForm = this.formBuilder.group({
      bookingId: [this.bookingId],
      amount: [0, this.totalAmount],
      status: [true]
    })
  }

  onPaymentSubmit(){
    this.paymentService.performPaymnet(this.bookingId, this.totalAmount, true)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response => {
        console.log(response)
        this.router.navigate(['/dashboard'])
      }
    })
  }

  onCancel(){
    let elem: any = document.getElementById('closeModalButtonDelete');
    elem.click();
    this.router.navigate(['/dashboard'])
  }
}
