import { Component, OnInit, OnDestroy } from '@angular/core';
import { IegresosService } from '../iegresos/iegresos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor( public ieServ:IegresosService ) { }

  ngOnInit() {
    this.ieServ.initIngreEgresoListener();
  }

  ngOnDestroy(){
    //ESto lo añadi yo..
    this.ieServ.cancelarSuscription();
  }
}
