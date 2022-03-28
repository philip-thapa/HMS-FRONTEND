import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CateService } from 'src/app/service/cate.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {

  roomList:any = []
  categoryList:any=[];
  addNewRoomForm!:FormGroup
  updateRoomForm!:FormGroup
  addRoomFormSubmitted: boolean = false
  updateRoomFormSubmitted: boolean = false

  constructor(private roomCateService: CateService ,private roomService: RoomService, private authService: AuthService, private formBuilder:FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
      this.router.navigate(["/signin"])
    this.roomService.getAllRooms()
    .subscribe(response=>{
      const {rooms} :any= response
      this.roomList = rooms;
    }, error=>{
      console.log(error)
    })
  }

  onAddNewRoomButton(){
    this.addNewRoomForm = this.formBuilder.group({
      room_type:['', Validators.required],
      availability:[true, Validators.required],
      description:[''],
      file:[null, Validators.required],
      fileSource: new FormControl('', [Validators.required])
    })

    this.roomCateService.getAllRoomCate()
    .subscribe(response=>{
      const {roomCate} :any= response
      this.categoryList = roomCate;
      console.log(this.categoryList)
    },error=>{
      console.log(error)
    })
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addNewRoomForm.patchValue({
        fileSource: file
      });
    }
  }

  get helper(){
    return this.addNewRoomForm.controls;
  }

  onAddNewRoomSubmit(){
    this.addRoomFormSubmitted = true
    let formData: FormData = new FormData(); 
    const{room_type, availability, description} = this.addNewRoomForm.value;
    formData.append("room_type", room_type)
    formData.append('availability', availability)
    formData.append('description', description)
    formData.append('image', this.addNewRoomForm.controls['fileSource'].value)
    this.roomService.addRoom(formData)
    .subscribe(response=>{
      let elem: any = document.getElementById('closeModalButtonAdd');
      elem.click();
      this.ngOnInit()
    }, error=>{
      console.log(error)
    })
  }


  onUpdateRoomButtonClick(roomId:number){
    const room = (this.roomList.filter((room:any)=>room.id === roomId))[0]
    this.updateRoomForm = this.formBuilder.group({
      id:[room.id],
      room_type:[room.room_type, Validators.required],
      availability:[room.availability, Validators.required],
      description:[room.description],
      file:[room.image, Validators.required],
      fileSource: new FormControl('', [Validators.required])
    })
  }

  get UpdateRoomHelper(){
    return this.updateRoomForm.controls;
  }
 

  onUpdateRoomSubmit(){
    this.updateRoomFormSubmitted = true
    let formData: FormData = new FormData(); 
    const{room_type, availability, description} = this.updateRoomForm.value;
    formData.append("room_type", room_type)
    formData.append('availability', availability)
    formData.append('description', description)
    formData.append('image', this.addNewRoomForm.controls['fileSource'].value)
    this.roomService.updateRoom(this.updateRoomForm.controls['id'].value, this.updateRoomForm.value)
    .subscribe(response=>{
      let elem: any = document.getElementById('closeModalButtonUpdate');
      elem.click();
      this.ngOnInit()
    },
    error=>{
      console.log(error)
    })
  }

  onDeleteRoom(roomId:number){
    this.roomService.deleteRoom(roomId)
    .subscribe(response=>{
      let elem: any = document.getElementById('closeModalButtonDelete');
      elem.click();
      this.ngOnInit()
    },
    error=>{
      console.log(error)
    })
  }

}
