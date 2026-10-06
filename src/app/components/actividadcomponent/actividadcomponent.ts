import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Actividad } from '../../model/actividadmodel';
import { Actividadservice } from '../../services/actividadservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividadcomponent',
  standalone: false,
  styleUrl: './actividad.component.css',
  templateUrl: './actividad.component.html',
})
export class Actividadcomponent implements OnInit {
  private actividadservice = inject(Actividadservice);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  listaActividad: Actividad[] = [];

  ngOnInit(): void {
    this.actividadservice.getActividades().subscribe({
      next: (data) => {
        this.listaActividad = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar las actividades', err);
      }
    });
  }

  seleccionarActividad(id: number) {
    void this.router.navigate(['reserva', 'actividades', id]);
  }
}
