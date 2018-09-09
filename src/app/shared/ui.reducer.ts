import * as fromUI from './ui.accions';

export interface State{
    isLoading: boolean;
}

const iniSate : State = {
    isLoading: false
};

export function uiReducer( state = iniSate , action: fromUI.Acciones ) : State{
    switch (action.type ) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
    
        default:
            return state;
    }
}