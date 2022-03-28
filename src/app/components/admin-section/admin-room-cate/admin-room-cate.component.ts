import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CateService } from 'src/app/service/cate.service';

@Component({
  selector: 'app-admin-room-cate',
  templateUrl: './admin-room-cate.component.html',
  styleUrls: ['./admin-room-cate.component.css']
})
export class AdminRoomCateComponent implements OnInit {

  categoryList:any=[];
  showModalForm:boolean = false;
  submitted: boolean = false
  addNewCateForm!: FormGroup
  updateCateForm!: FormGroup
  updateFormsubmitted:boolean = false

  constructor(private roomCateService: CateService, private authService: AuthService, private formBuilder:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated())
      this.router.navigate(["/signin"])
    this.roomCateService.getAllRoomCate()
    .subscribe(response=>{
      const {roomCate} :any= response
      this.categoryList = roomCate;
      console.log(this.categoryList)
    }, error=>{
      console.log(error)
    })
  }

  onAddClick(){
    this.addNewCateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      cost_of_room_type: [null, Validators.required]
    })
  }

  get helper(){
    return this.addNewCateForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.addNewCateForm.invalid){
      return;
    }

    this.roomCateService.addRoomCate(this.addNewCateForm.value)
    .subscribe(response=>{
      const {status}:any = response
      if(status == 200){
        let elem: any = document.getElementById('closeModalButtonAdd');
        elem.click();
        this.ngOnInit()
      }else{
        this.addNewCateForm.setErrors({error: true})
      }
    },
    error=>{
      console.log(error)
    })
  }

  onRoomCateUpdateClick(roomId:number){
    const roomCate = (this.categoryList.filter((roomCa:any)=>roomCa.id === roomId))[0]
    this.updateCateForm = this.formBuilder.group({
      id: [roomCate.id],
      name: [roomCate.name, Validators.required],
      description:[roomCate.description, Validators.required],
      cost_of_room_type:[roomCate.cost_of_room_type, Validators.required],
    })
  }

  get updateRoomHelper(){
    return this.updateCateForm.controls;
  }


  onUpdateSubmit(){
    this.updateFormsubmitted = true;
    this.roomCateService.updateRoomCate(this.updateCateForm.controls['id'].value, this.updateCateForm.value)
    .subscribe(response=>{
      let elem: any = document.getElementById('closeModalButtonUpdate');
      elem.click();
      this.ngOnInit()
    },
    error=>{
      console.log(error)
    })
  }

  deleteCate(roomId:number){
    this.roomCateService.deleteRoomCate(roomId)
    .subscribe(response=>{
      let elem = document.getElementById('closeModalButtonDelete')
      elem?.click();
      this.categoryList = this.categoryList.filter((cate:any)=>cate.id !== roomId)
      this.ngOnInit()
    }, error=>{
      console.log(error)
    })
  }

  navigateToRoomCateDetails(roomCateId:number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": roomCateId,
      }
    };
    this.router.navigate(['/admin/roomcate/rooms'], navigationExtras);
  }
}
