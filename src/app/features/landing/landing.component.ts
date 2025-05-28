import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../../shared/components/nabvar/navbar.component';
import { SectionPromocionaComponent } from '../marketing/section-promociona/section-promociona.component';
import { SectionLanzamientoComponent } from '../marketing/section-lanzamiento/section-lanzamiento.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TestimoniosComponent } from '../marketing/section-testimonios/testimonios.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEleccionComponent } from '../../shared/components/modal-eleccion/modal-eleccion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    NavbarComponent,
    SectionPromocionaComponent,
    SectionLanzamientoComponent,
    FooterComponent,
    TestimoniosComponent,
    ModalEleccionComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  logoPath = 'assets/adorbit-logo.png';
  cuentaSeleccionada: string | null = null; // 👈 esta línea soluciona el error

  constructor(private router: Router, private dialog: MatDialog) {}

  abrirModalEleccion() {
    const dialogRef = this.dialog.open(ModalEleccionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cuentaSeleccionada = result === 'musica' ? '🎵 Música' : '🛍️ Comercio';

        setTimeout(() => {
          this.router.navigate([result === 'musica' ? '/registro-musica' : '/registro-comercio']);
        }, 300);
      }
    });
  }
}


