import { Component, OnInit, OnDestroy } from '@angular/core';
import { IegresosService } from '../iegresos.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppSate } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

	suscription: Subscription = new Subscription();
	items: IngresoEgreso[];

	constructor(private store: Store<AppSate> , private ieServ: IegresosService) { }

	ngOnInit() {
		this.suscription = this.store.select('IngresoEgreso')
			.subscribe( data => this.items =  data.items );
	}

	ngOnDestroy() {
		this.suscription.unsubscribe();
	}

	borrar(item : IngresoEgreso){
		this.ieServ.eliminar( item.uid ).then( () => {
			Swal(` ${ item.descripcion } eliminado !` , '', 'success');
		})
	}

}
