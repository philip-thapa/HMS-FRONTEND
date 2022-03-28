import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { CateService } from 'src/app/service/cate.service';

@Component({
  selector: 'app-admin-room-cate-rooms',
  templateUrl: './admin-room-cate-rooms.component.html',
  styleUrls: ['./admin-room-cate-rooms.component.css']
})
export class AdminRoomCateRoomsComponent implements OnInit {

  sub: any;
  roomCateId!: number
  rooms!: any
  roomCateName!:any

  constructor(private route: ActivatedRoute, private router: Router, private roomCateService: CateService) {
    this.sub = this.route.queryParams.subscribe(params => {
      this.roomCateId = params["id"];
    });
  }
  
  ngOnInit(): void {
    this.roomCateService.getAllRoomsOfRoomCate(this.roomCateId)
    .pipe(distinctUntilChanged())
    .subscribe({
      next: response => {
        const {rooms, roomCateName}: any = response
        this.rooms = rooms
        this.roomCateName = roomCateName
      },
      error: e=>console.log(e)
    })
  }

}
