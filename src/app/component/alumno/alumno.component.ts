import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AlumnoService } from '../../alumno/services/alumno.service';
import { Alumno } from '../../alumno/models/alumno';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { Carrera } from '../../carrera/models/carrera';
import { CarreraService } from '../../carrera/services/carrera.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' }
  ];
  carreraOpttion: Carrera[]=[];
  alumnos!: Alumno[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  alumno = new Alumno(0, '', '', '1', new Carrera(0, '', ''));

  constructor(
    private alumnoService: AlumnoService, 
    private messageService: MessageService,
    private carreraService: CarreraService
  ) {}

  ngOnInit() {
    this.listarAlumnos();
    this.cargarCarrerasActivas();
  }

  cargarCarrerasActivas() {
    this.carreraService.getCarrerasActivas().subscribe({
      next: (data) => {
        this.carreraOpttion = data;
      },
      error: (error) => {
        console.error('Error al cargar las carreras activas', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las carreras activas',
        });
      }
    });
  }

  listarAlumnos(){
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  deleteAlumno(id: number) {
    this.isDeleteInProgress = true;
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarAlumnos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el alumno',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Alumno';
    this.opc = 'Editar';
    this.alumnoService.getAlumnoByID(id).subscribe((data) => {
      this.alumno = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Alumno';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.alumno = {
      id: 0,
      nombres: '',
      apellidos: '',
      estado: '1',
      carrera: {
        id: 0,
        carrera: '',
        estado: ''
      }
    };
  }

  addAlumno(): void {
    if (!this.alumno.nombres || this.alumno.nombres.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del alumno no puede estar vacío',
      });
      return;
    }

    this.alumnoService.crearAlumno(this.alumno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno registrado',
        });
        this.listarAlumnos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el alumno',
        });
      },
    });
    this.visible = false;
  }
  
  updateAlumno() {
    this.alumnoService.updateAlumno(this.alumno.id, this.alumno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Alumno editado',
        });
        this.listarAlumnos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el alumno',
        });
      },
    });
    this.visible = false;
  }
}
