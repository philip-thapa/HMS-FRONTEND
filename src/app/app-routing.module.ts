import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminBookingsComponent } from './components/admin-section/admin-bookings/admin-bookings.component';
import { AdminRoomCateRoomsComponent } from './components/admin-section/admin-room-cate/admin-room-cate-rooms/admin-room-cate-rooms.component';
import { AdminRoomCateComponent } from './components/admin-section/admin-room-cate/admin-room-cate.component';
import { AdminRoomsComponent } from './components/admin-section/admin-rooms/admin-rooms.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { AdminUsersComponent } from './components/admin-section/admin-users/admin-users.component';
import { AboutComponent } from './components/layout/about/about.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PaymentComponent } from './components/user-section/user-bookings/payment/payment.component';
import { UserBookingsComponent } from './components/user-section/user-bookings/user-bookings.component';
import { UserDashboardComponent } from './components/user-section/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-section/user-profile/user-profile.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { UserAuthGuard } from './user-auth-guard.guard';

const routes: Routes = [
  {path:'register', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'about', component: AboutComponent},

  {path: 'admin/home', component: AdminSectionComponent, canActivate:[AuthGuard]},
  {path: 'admin/roomcate', component: AdminRoomCateComponent, canActivate:[AuthGuard]},
  {path: 'admin/rooms', component: AdminRoomsComponent, canActivate:[AuthGuard]},
  {path: 'admin/users', component: AdminUsersComponent, canActivate:[AuthGuard]},
  {path: 'admin/bookings', component: AdminBookingsComponent, canActivate:[AuthGuard]},
  {path: 'admin/roomcate/rooms', component: AdminRoomCateRoomsComponent, canActivate:[AuthGuard]},

  {path: 'home', component: UserSectionComponent},
  {path: 'book', component: UserBookingsComponent, canActivate:[UserAuthGuard]},
  {path: 'dashboard', component: UserDashboardComponent, canActivate:[UserAuthGuard]},
  {path: 'profile', component: UserProfileComponent},
  {path: 'booking/payement', component: PaymentComponent, canActivate:[UserAuthGuard]},
  
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
