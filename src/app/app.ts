import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { AppModule } from './app-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Iniciocomponent, AppModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'ProyectoModulo2';
}
