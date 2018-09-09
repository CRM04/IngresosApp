import * as fromAtuth from './auth.actions';
import { User } from './user.model';

//Todo lo relacionado con la informacion de la autenticacion
export  interface AuthState{
    user:User
}

const iniState:AuthState = {
    user:null
};


export function authReducer ( state = iniState, action:fromAtuth.Acciones ):AuthState{
    switch (action.type) {
        case fromAtuth.SET_USER:
            return {
                user: {... action.user }
            };
        
        case fromAtuth.UNSET_USER:
            return{
                user: null
            }
    
        default:
            return state;
    }
}