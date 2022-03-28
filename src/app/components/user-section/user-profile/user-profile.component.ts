import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: any

  updateProfileForm!: FormGroup
  submitted: boolean = false
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUser(this.authService.getUserId())
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response=>{
        const {user}: any = response
        // console.log("USER ", user)
        this.user = user
      },
      error: e =>console.log(e)
    })
  }

  onUpdateClick(){
    this.submitted =true
    this.updateProfileForm = this.formBuilder.group({
      id: [this.user.id],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
    })
  }

  get helper(){
    return this.updateProfileForm.controls;
  }

  onUpdateSubmit(){
    this.userService.updateUserDetails(this.user?.id, this.updateProfileForm.value)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response => {
        // console.log(response)
        const {user}:any = response
        this.user = user
        let elem: any = document.getElementById('closeModalButtonUpdate');
        elem.click();
        this.ngOnInit()
      },
      error: e=>console.log(e)
    })
  }

  

}
