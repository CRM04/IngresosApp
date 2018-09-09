import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AppSate } from '../../app.reducer';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando:boolean;
  suscription:Subscription = new Subscription();

  constructor(private autServ:AuthServiceService, private store:Store<AppSate> ) { }

  ngOnInit() {
    this.suscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  onSubmit(data : any){
    this.autServ.crearUsuario(data.nombre,  data.correo, data.password);
    // console.log(data);
  }

}
