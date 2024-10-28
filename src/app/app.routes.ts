import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AlumnoComponent } from './component/alumno/alumno.component';
import { CarreraComponent } from './component/carrera/carrera.component';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'alumno',
        component: AlumnoComponent,
        title: 'Alumno'
    },
    {
        path: 'carrera',
        component: CarreraComponent,
        title: 'Carrera'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }

];
