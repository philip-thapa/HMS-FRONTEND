import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CateService } from 'src/app/service/cate.service';
import {imageUrl} from "../../urlHelper"

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent implements OnInit {

  isAuthenticated!:boolean
  imageURL = imageUrl

  categoryList:any=[];

  constructor(private authService: AuthService, private roomCateService: CateService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
      this.router.navigate(["/signin"])
    this.isAuthenticated= this.authService.isAuthenticated()
    this.roomCateService.getAllRoomCate()
    .subscribe(response=>{
      const {roomCate} :any= response
      this.categoryList = roomCate;
    }, error=>{
      console.log(error)
    })
  }

  navigaeToUserBookingComponent(roomCateId:number, roomName:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": roomCateId,
        "name": roomName
      }
    };
    this.router.navigate(['/book'], navigationExtras);
  }
}
