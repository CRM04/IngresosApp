
export class User{
    public nombre:string;
    public uid:string;
    public email:string;

    constructor(usuario: DataObj){
        this.nombre = usuario && usuario.nombre || null;
        this.uid = usuario && usuario.uid || null;
        this.email = usuario && usuario.email || null;
    }
}

interface DataObj{
    uid: string;
    email:string;
    nombre:string;
}