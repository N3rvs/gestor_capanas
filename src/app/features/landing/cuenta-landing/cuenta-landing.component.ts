import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TestimoniosComponent } from '../../../features/landing/marketing/section-testimonios/testimonios.component'; // ajústalo a tu ruta real
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/nabvar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-cuenta-landing',
  templateUrl: './cuenta-landing.component.html',
  styleUrls: ['./cuenta-landing.component.scss'],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TestimoniosComponent,
    FooterComponent,
    NavbarComponent,
    MatCardModule
  ]
})
export class CuentaLandingComponent {
  constructor(private router: Router) {}

  crearCuenta(tipo: 'musico' | 'comercio') {
    this.router.navigate([tipo === 'musico' ? '/registro-musico' : '/registro-comercial']);
  }
}
