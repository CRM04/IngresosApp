import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AppSate } from '../../app.reducer';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando:boolean;
  suscription:Subscription = new Subscription();

  constructor(private authServ: AuthServiceService, private store:Store<AppSate>) { }

  ngOnInit() {
    this.suscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  onSubmit(data){
    // console.log(data)
    this.authServ.login(data.correo, data.password);
  }
}
