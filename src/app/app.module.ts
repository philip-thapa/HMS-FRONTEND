import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { AdminUsersComponent } from './components/admin-section/admin-users/admin-users.component';
import { AdminRoomCateComponent } from './components/admin-section/admin-room-cate/admin-room-cate.component';
import { AdminRoomsComponent } from './components/admin-section/admin-rooms/admin-rooms.component';
import { AdminBookingsComponent } from './components/admin-section/admin-bookings/admin-bookings.component';
import { UserBookingsComponent } from './components/user-section/user-bookings/user-bookings.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { JumbotronComponent } from './components/layout/jumbotron/jumbotron.component';
import { FooterComponent } from './components/layout/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutComponent } from './components/layout/about/about.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { AdminUserDetailsComponent } from './components/admin-section/admin-users/admin-user-details/admin-user-details.component';
import { UserDashboardComponent } from './components/user-section/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-section/user-profile/user-profile.component';
import { UpdateBookingComponent } from './components/user-section/user-dashboard/update-booking/update-booking.component';
import { AdminRoomCateRoomsComponent } from './components/admin-section/admin-room-cate/admin-room-cate-rooms/admin-room-cate-rooms.component';

// external libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminSectionComponent,
    UserSectionComponent,
    AdminUsersComponent,
    AdminRoomCateComponent,
    AdminRoomsComponent,
    AdminBookingsComponent,
    UserBookingsComponent,
    NavBarComponent,
    JumbotronComponent,
    FooterComponent,
    SignInComponent, 
    SignUpComponent, 
    AboutComponent, 
    PageNotFoundComponent,

    AdminUserDetailsComponent,
          UserDashboardComponent,
          UserProfileComponent,
          UpdateBookingComponent,
          AdminRoomCateRoomsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
