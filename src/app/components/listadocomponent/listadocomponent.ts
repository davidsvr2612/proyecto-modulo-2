import { Component, OnInit } from '@angular/core';
import { Alojamientoservice} from '../../services/alojamientoservice';
import { Alojamientomodel} from '../../models/alojamientomodel';

@Component({
  selector: 'app-listadocomponent',
  standalone: false,
  styleUrl: './listadocomponent.css',
  templateUrl: './listadocomponent.html',
})
export class Listadocomponent implements OnInit {
  alojamiento: Alojamientomodel[] = [];
}
