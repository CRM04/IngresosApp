import * as fromIEgreso from './iegresos.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

//Asi lucira el state correspondiente a ingresos reducer.
export interface IngresoEgresoState{
    items: IngresoEgreso[]
}

const estadoInicial : IngresoEgresoState = {
    items:[]
}

export function IngresoEgresoReducer( state  = estadoInicial, acccion: fromIEgreso.Acciones) : IngresoEgresoState{
    switch (acccion.type) {
        case fromIEgreso.SET_ITEMS:
            //Se recorre todo el arreglo creando un nuevo arreglo, con nuevos elementos 
            return {
                items: [
                    ...acccion.items.map( item => {
                        return{
                            ...item
                        }
                    })
                ]
            }

        case fromIEgreso.UNSET_ITEMS:
            return {
                items:[]
            }
    
        default:
            return state;
    }
}