import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){
  }
  canActivate(): boolean{
    if(this._authService.isUser()){
      return true
    }else{
      this._router.navigate(['/signin'])
      return false
    }
  }
}