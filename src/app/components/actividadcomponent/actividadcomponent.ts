import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Actividad } from '../../model/actividadmodel';
import { Actividadservice } from '../../services/actividadservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividadcomponent',
  standalone: false,
  styleUrl: './actividadcomponent.css',
  templateUrl: './actividadcomponent.html'
})
export class Actividadcomponent implements OnInit {
  private actividadservice = inject(Actividadservice);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  listaActividades: Actividad[] = [];

  ngOnInit(): void {
    this.actividadservice.getActividades().subscribe({
      next: (data: Actividad[]) => {
        this.listaActividades = data;
        this.cdr.markForCheck();
      },
      error: (err: unknown) => {
        console.error('Error al cargar las actividades', err);
      }
    });
  }

  seleccionarActividad(id: number) {
    void this.router.navigate(['reserva', 'actividades', id]);
  }
}
