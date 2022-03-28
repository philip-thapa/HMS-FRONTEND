import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  userList!: any;
  user!: any;
  userId!: number;
  toggleUserDetails: boolean = true
  previousUserId!: any;
  searchUserForm!: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   
    this.userService.getAllUsers()
    .subscribe({
      next: (response) => {
        const {users}: any = response
        this.userList = users
      },
      error: (e) => console.error(e),
  })
  this.searchUserForm = this.formBuilder.group({
    searchUserInput: ['']
  })
  }

  onUserClick(userIdd:number){
    if(userIdd !== this.previousUserId){
      this.userService.getUser(userIdd)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (response) => {
          console.log(response)
          const {user}: any= response
          this.user = user
          this.toggleUserDetails = false
          this.userId = userIdd
          this.previousUserId = userIdd
        }, 
        error:(e)=>console.log(e),
      })
    }else{
      this.toggleUserDetails = true;
      this.previousUserId = null
    }
  }

  onSearchSubmit(){
    this.userService.searchUser(this.searchUserForm.controls['searchUserInput'].value)
    .subscribe({
      next:response=>{
        const {users}:any = response
        this.userList = users
      }
    })
  }

}
