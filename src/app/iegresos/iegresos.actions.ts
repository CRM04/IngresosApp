import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
export const SET_ITEMS = '[INGRESO - EGRESO] SET ITEMS';
export const UNSET_ITEMS = '[INGRESO - EGRESO] UNSET ITEMS';

export class setItemsActions implements Action{
    readonly type = SET_ITEMS;

    constructor( public items:IngresoEgreso[]){

    }
}

export class UnSetItems implements Action{
    readonly type = UNSET_ITEMS;
}

export type Acciones = setItemsActions | UnSetItems;