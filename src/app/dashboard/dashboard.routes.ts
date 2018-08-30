
import {  Routes } from '@angular/router';
import { EstadisticasComponent } from '../iegresos/estadisticas/estadisticas.component';
import { IegresosComponent } from '../iegresos/iegresos.component';
import { DetalleComponent } from '../iegresos/detalle/detalle.component';

export const DashRoutes: Routes = [
    { path: '', component: EstadisticasComponent },
    { path: 'ingresoEgreso', component: IegresosComponent },
    { path: 'detalle', component: DetalleComponent }
];
