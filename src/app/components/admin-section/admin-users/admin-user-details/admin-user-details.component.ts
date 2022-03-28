import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {

  @Input() user: any
  constructor() {}

  ngOnInit(): void {
  }

}
