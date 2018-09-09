import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private authServ:AuthServiceService ) { }

  canActivate(){
    return this.authServ.isAuth();
  }
}
