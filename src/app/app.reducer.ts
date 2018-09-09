import * as fromUI from './shared/ui.reducer';
import  * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromIEgreso from './iegresos/iegresos.reducer';

export interface AppSate{
    ui: fromUI.State
    auth: fromAuth.AuthState
    IngresoEgreso: fromIEgreso.IngresoEgresoState
}

export const appReducer : ActionReducerMap<AppSate> = {
    ui: fromUI.uiReducer,
    auth:fromAuth.authReducer,
    IngresoEgreso: fromIEgreso.IngresoEgresoReducer
}

