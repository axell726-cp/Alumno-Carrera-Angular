import { Carrera } from "../../carrera/models/carrera";

export class Alumno {
    id: number;
    nombres: string;
    apellidos: string;
    estado: string ;
    carrera: Carrera;

    constructor(id: number=0, nombres: string='', apellidos: string='', estado: string = '', carrera: Carrera) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.estado = estado;
        this.carrera = carrera;
    }
}
