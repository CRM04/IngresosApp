import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IegresosService } from './iegresos.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppSate } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
	selector: 'app-iegresos',
	templateUrl: './iegresos.component.html',
	styles: []
})
export class IegresosComponent implements OnInit , OnDestroy{
	
	forma: FormGroup;
	tipo = 'ingreso';
	loadSub : Subscription = new Subscription();
	cargando:boolean;

	constructor( public iegresoServ:IegresosService, private store:Store<AppSate> ) { }

	ngOnInit() {

		this. loadSub =  this.store.select('ui').subscribe( ui => {
			this.cargando = ui.isLoading
		});

		this.forma = new FormGroup({
			'descripcion': new FormControl('', Validators.required),
			'monto': new FormControl( 0, Validators.min(1) )
		});
	}

	ngOnDestroy(){
		this.loadSub.unsubscribe();
	}

	crearIngresoEgreso(){
		const iegreso = new IngresoEgreso({...this.forma.value ,tipo: this.tipo });
		this.store.dispatch( new ActivarLoadingAction() );

		this.iegresoServ.crearIEgreso(iegreso).then( () => {
			this.store.dispatch( new DesactivarLoadingAction() );

			Swal('Guardado !' , iegreso.descripcion, 'success')
			this.forma.reset({ monto: 0})
		}).catch( (err) => {
			this.store.dispatch( new DesactivarLoadingAction() );
			Swal('Error !' , err.message, 'error')
		} );
	}

}
