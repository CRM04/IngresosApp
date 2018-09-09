import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IegresosComponent } from './iegresos/iegresos.component';
import { DetalleComponent } from './iegresos/detalle/detalle.component';
import { EstadisticasComponent } from './iegresos/estadisticas/estadisticas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';


//Modules
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

//FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment.prod';
import { OrdenPipePipe } from './iegresos/orden-pipe.pipe';

//Graphs
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IegresosComponent,
    DetalleComponent,
    EstadisticasComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    OrdenPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducer),
    ChartsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
