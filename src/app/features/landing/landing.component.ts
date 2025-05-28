import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../../shared/components/nabvar/navbar.component';
import { SectionPromocionaComponent } from '../marketing/section-promociona/section-promociona.component';
import { SectionLanzamientoComponent } from '../marketing/section-promociona/section-lanzamiento/section-lanzamiento.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, NavbarComponent, SectionPromocionaComponent,SectionLanzamientoComponent,FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  logoPath = 'assets/adorbit-logo.png';
}
