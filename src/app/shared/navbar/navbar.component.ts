import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSate } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit {

	nombreUser: string
	suscription: Subscription = new Subscription();

	constructor(private store: Store<AppSate>) { }

	ngOnInit() {
		this.suscription =  this.store.select('auth')
			.pipe( filter( auth => auth.user != null ) )
			.subscribe((auth) => {
				this.nombreUser  = auth.user.nombre
			})
	}

}
