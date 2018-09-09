import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSate } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-estadisticas',
	templateUrl: './estadisticas.component.html',
	styles: []
})
export class EstadisticasComponent implements OnInit, OnDestroy {

	suscription : Subscription = new Subscription();
	contIngresos: number;
	contEgresos:number;
	acumuladoIngresos:number;
	acumuladoEgresos:number;


	public doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
  	public doughnutChartData:number[];

	constructor(private store: Store<AppSate>) { }

	ngOnInit() {
		this.suscription = this.store.select('IngresoEgreso')
		.pipe(
			filter(item => item.items.length != null))
		.subscribe( items => this.contarIEgresos( items.items) )
	}

	ngOnDestroy(){
		this.suscription.unsubscribe();
	}

	contarIEgresos( items ){
		this.contEgresos = 0;
		this.contIngresos = 0;
		this.acumuladoEgresos = 0;
		this.acumuladoIngresos = 0;

		if( items.length > 0){
			items.forEach( item => {

				if( item.tipo == 'ingreso'){
					this.contIngresos += 1;
					this.acumuladoIngresos += item.monto;
				}else{
					this.contEgresos += 1;
					this.acumuladoEgresos += item.monto;
				}
			});
			this.doughnutChartData = [ this.acumuladoIngresos ,  this.acumuladoEgresos ];
		}

	}

}
