export class Carrera {
    id: number;
    carrera: string;
    estado: string;

    constructor(id: number=0, carrera: string='', estado: string='') {
        this.id = id;
        this.carrera = carrera;
        this.estado = estado;   
    }
}
