import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private router: Router, private authService: AuthService) { }

  loginForm!: FormGroup
  submitted: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get helper(){
    return this.loginForm.controls;
  }
  
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
    let formData: FormData = new FormData(); 
    const{email, password} = this.loginForm.value;
    formData.append("email", email)
    formData.append('password', password)
    this.authService.login(formData)
    .subscribe((response)=>{
      const {status}:any = response;
      if(status==200){
        const {user, token}: any = response;
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
        if(this.authService.isAdmin()){
          this.router.navigate(['/admin/home'])
        }else{
          this.router.navigate(['/home'])
        }
      }else{
        this.loginForm.setErrors({ unauthenticated: true })
      }
      
    },
    (error)=>{
      console.log("SIGNIN FAILED")
    })
  }

}
