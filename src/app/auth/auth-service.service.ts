import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppSate } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { setUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceService {

	userSuscription:Subscription = new Subscription();
	usuario:User;

	constructor(private afAuth: AngularFireAuth,
		private router: Router,
		private afDB: AngularFirestore,
		private store: Store<AppSate>) { }

	initAuthListener() {
		this.afAuth.authState.subscribe((fbUser: firebase.User) => {
			if( fbUser ){
				this.userSuscription = this.afDB.doc( `${fbUser.uid}/usuario`).valueChanges().subscribe( (usuarioFB:any) => {
					const newUser = new User( usuarioFB );
					this.store.dispatch( new setUserAction(newUser));
					this.usuario = newUser;
				})
			}else{
				this.usuario = null;
				this.userSuscription.unsubscribe();
			}
		})
	}


	crearUsuario(nombre: string, correo: string, pass: string) {
		this.store.dispatch(new ActivarLoadingAction());
		this.afAuth.auth.createUserWithEmailAndPassword(correo, pass)
			.then((data) => {
				// console.log( data );
				const user: User = {
					nombre: nombre,
					uid: data.user.uid,
					email: data.user.email
				};

				this.afDB.doc(`${user.uid}/usuario`).set(user).then(() => {
					this.router.navigate(['/']);
					this.store.dispatch(new DesactivarLoadingAction());
				});

			})
			.catch((data) => {
				console.error('error', data);
				this.store.dispatch(new DesactivarLoadingAction());
				Swal('Error', data.message, 'error')
			})
	}

	login(correo: string, pass: string) {
		this.store.dispatch(new ActivarLoadingAction());
		this.afAuth.auth.signInWithEmailAndPassword(correo, pass)
			.then((data) => {
				this.store.dispatch(new DesactivarLoadingAction());
				this.router.navigate(['/']);
			})
			.catch((error) => {
				this.store.dispatch(new DesactivarLoadingAction());
				Swal('Error', error.message, 'error')
			});
	}

	logOut() {
		this.router.navigate(['/login']);
		this.afAuth.auth.signOut();
		this.store.dispatch( new UnSetUserAction());
	}

	isAuth() {
		return this.afAuth.authState.pipe(
			map(fbUser => {
				if (fbUser == null) {
					this.router.navigate(['/login']);
				}
				return fbUser != null;
			})
		);
	}

	getUsuario(){
		return {...this.usuario};
	}
}
