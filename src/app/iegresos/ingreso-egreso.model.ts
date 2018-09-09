
export class IngresoEgreso{
    public descripcion:string;
    public monto:number;
    public tipo:string;
    public uid?:string;

    constructor ( datObject: datObject){
        this.descripcion = datObject && datObject.descripcion || null;
        this.monto = datObject && datObject.monto || null;
        this.tipo = datObject && datObject.tipo || null;
        //this.uid = datObject && datObject.uid || null;
    }
}


interface datObject{
    descripcion:string;
    monto:number;
    tipo:string;
    //uid?:string;
}