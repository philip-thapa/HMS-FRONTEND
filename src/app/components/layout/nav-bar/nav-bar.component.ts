import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  
  authenticate(): boolean{
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    
  }

  async onLogout(){
    try{
      const user = localStorage.getItem("user");
      let id;
      if(user !== null)
        id = JSON.parse(user).id;
      this.authService.logout(id)
      .subscribe(response=>{
        console.log("Logout response",response)
        localStorage.clear()
        this.router.navigate(['/signin'])
      },
      (error)=>{
        console.log("Logout error",error)
      })
    }catch(error){
      console.log(error)
    }
    
  }

}
