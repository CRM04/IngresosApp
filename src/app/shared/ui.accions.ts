import { Action } from "@ngrx/store";

export const ACTIVAR_LOADING = '[ACTIVNADO UI LOADING]';
export const DESACTIVAR_LOADING = '[DESACTIVANDO UI LOADING]';

export class ActivarLoadingAction implements Action{
    readonly type  = ACTIVAR_LOADING;
}


export class DesactivarLoadingAction implements Action{
    readonly type  = DESACTIVAR_LOADING;
}

export type Acciones = ActivarLoadingAction | DesactivarLoadingAction;