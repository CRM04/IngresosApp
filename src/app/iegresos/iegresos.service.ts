import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthServiceService } from '../auth/auth-service.service';
import { Store } from '@ngrx/store';
import { AppSate } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { setItemsActions, UnSetItems } from './iegresos.actions';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IegresosService {

	ingresoEgresoSuscription: Subscription = new Subscription();
	ingresoEgresoItemSuscription:Subscription = new Subscription();

	constructor(private afb: AngularFirestore, 
				private authServ: AuthServiceService, 
				private store: Store<AppSate>) { }

	initIngreEgresoListener() {
		this.ingresoEgresoSuscription =  
			this.store.select('auth')
				.pipe(
					filter(auth => auth.user != null))
				.subscribe( auth => this.ingresoEgresoItems( auth.user.uid) )
	}

	private ingresoEgresoItems( uid: string){
		this.ingresoEgresoItemSuscription = 
			this.afb.collection(`${ uid }/ingresos-egresos/items`)
					.snapshotChanges()
					.pipe(
						map( docData => {
							return docData.map( doc => {
								return {
									uid: doc.payload.doc.id,
									...doc.payload.doc.data()
								}
							})
						})
					)
					.subscribe( (coleccion : any[] ) => {
						this.store.dispatch( new setItemsActions( coleccion ) );
					} );
	}

	crearIEgreso(iegreso: IngresoEgreso) {
		const user = this.authServ.getUsuario();
		return this.afb.doc(`${user.uid}/ingresos-egresos`).collection('items').add({ ...iegreso });
	}

	cancelarSuscription(){
		this.ingresoEgresoItemSuscription.unsubscribe();
		this.ingresoEgresoSuscription.unsubscribe();
		this.store.dispatch( new UnSetItems() );
	}

	eliminar(uid : string ){
		const user = this.authServ.getUsuario();
		return this.afb.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`).delete();
	}
}
