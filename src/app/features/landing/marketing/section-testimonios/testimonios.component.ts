import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.scss']
})
export class TestimoniosComponent {
   testimonios = [
    {
      nombre: 'Ana Torres',
      rol: 'Ecommerce Manager',
      comentario: 'Con AdOrbit optimicé mis campañas en minutos. ¡Es como tener un equipo entero en una sola app!',
      foto: 'assets/logo_solo.png'
    },
    {
      nombre: 'Luis Bravo',
      rol: 'Growth Hacker',
      comentario: 'AdOrbit me dio control total de Meta Ads sin complicaciones técnicas. ¡Recomendada!',
      foto: 'assets/logo_solo.png'
    },
    {
      nombre: 'Claudia Serrano',
      rol: 'Agencia Freelance',
      comentario: 'Puedo manejar campañas de múltiples clientes desde una misma interfaz visual y elegante.',
      foto: 'assets/logo_solo.png'
    },
    {
      nombre: 'Jorge Méndez',
      rol: 'Consultor Digital',
      comentario: 'La automatización de reportes es simplemente brillante. Me ahorra horas cada semana.',
      foto: 'assets/logo_solo.png'
    },
    {
      nombre: 'Sandra Ruiz',
      rol: 'Social Media Manager',
      comentario: 'Ver resultados en tiempo real me permite reaccionar más rápido que nunca. 10/10.',
      foto: 'assets/logo_solo.png'
    }
  ];

  currentIndex = 0;
  itemsPerView = 1;

  ngOnInit() {
    this.setItemsPerView();
  }

  @HostListener('window:resize')
  setItemsPerView() {
    const width = window.innerWidth;
    this.itemsPerView = width >= 1024 ? 3 : 1;
  }

get currentGroup() {
  const total = this.testimonios.length;
  const group = [];

  for (let i = 0; i < this.itemsPerView; i++) {
    const index = (this.currentIndex + i) % total;
    group.push(this.testimonios[index]);
  }

  return group;
}

next() {
  this.currentIndex = (this.currentIndex + 1) % this.testimonios.length;
}

prev() {
  this.currentIndex = (this.currentIndex - 1 + this.testimonios.length) % this.testimonios.length;
}
}