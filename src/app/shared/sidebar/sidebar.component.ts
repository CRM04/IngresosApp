import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { AppSate } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  
  nombreUser:string;

  constructor(public authServ:AuthServiceService , private store:Store<AppSate> ) { }

  ngOnInit() {
    this.store.select('auth').pipe( filter(auth => auth.user != null )).subscribe( (auth) => {
      this.nombreUser = auth.user.nombre
    });
  }


  logOut(){
    this.authServ.logOut();
  }
}
