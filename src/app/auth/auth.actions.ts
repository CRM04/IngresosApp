import { Action } from '@ngrx/store';
import { User } from './user.model';


export const SET_USER = '[AUTH] SET USER';
export const UNSET_USER = '[AUTH] UNSET_USER';

export class setUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user:User){

    }
}

export class UnSetUserAction implements Action{
    readonly type = UNSET_USER;
}

export type Acciones = setUserAction | UnSetUserAction;