import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CarreraService } from '../../carrera/services/carrera.service';
import { Carrera } from '../../carrera/models/carrera';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' }
  ];
  
  carreras: Carrera[] = [];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  carrera = new Carrera();
  sedeTemp: string = '';
  

  constructor(private carreraService: CarreraService, private messageService: MessageService) {}

  ngOnInit() {
    
    this.listarCarrera();
    
  }

  listarCarrera(){
    this.carreraService.getCarreras().subscribe((data) => {
      this.carreras = data;
    });
  }

  
  deleteCarrera(id: number) {
    this.isDeleteInProgress = true;
    this.carreraService.deleteCarrera(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrera eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarCarrera();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la carrera',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Carrera';
    this.opc = 'Editar';
    this.carreraService.getCarrerabyID(id).subscribe((data) => {
      this.carrera = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Carrera';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.carrera = {
      id: 0,
      carrera: '',
      estado: '1'
    };
  }

  addCarrera(): void {
    if (!this.carrera.carrera || this.carrera.carrera.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre de la carrera no puede estar vacío',
      });
      return;
    }

    this.carreraService.crearCarrera(this.carrera).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrera registrada',
        });
        this.listarCarrera();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la carrera',
        });
      },
    });
    this.visible = false;
  }
  
  updateCarrera() {
    this.carreraService.updateCarrera(this.carrera.id, this.carrera).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Carrera editada',
        });
        this.listarCarrera();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar la carrera',
        });
      },
    });
    this.visible = false;
  }
}
