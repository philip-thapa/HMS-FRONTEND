import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs';
import { PasswordChecker } from 'src/app/CustomValidators/password-checker';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  registrationForm!: FormGroup;
  submitted:boolean= false;

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: [''],
      lastName: [''],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confPassword: ['', [Validators.required]],
    }, {
      validator: PasswordChecker('password', 'confPassword')
    })
  }

  get helper(){
    return this.registrationForm.controls;
  }


  onSubmit(){
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }
    this.authService.register(this.registrationForm.value)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response=>{
        console.log(response)
        this.toastr.success('Sign Up success');
        this.router.navigate(["/signin"])
      },
      error: e=>{
        console.log(e)
        this.registrationForm.setErrors({'exists': true})
      }
    })
  }

  onReset(): void{
    this.submitted = false;
    this.registrationForm.reset()
  }
}
