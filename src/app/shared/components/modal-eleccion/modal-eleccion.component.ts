import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-eleccion',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>¿Qué tipo de cuenta quieres crear?</h2>
    <mat-dialog-content class="dialog-content">
      <button mat-raised-button color="primary" (click)="seleccionar('musica')">🎵 Música</button>
      <button mat-raised-button color="accent" (click)="seleccionar('comercio')">🛍️ Comercio</button>
    </mat-dialog-content>
  `,
  styles: [`
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
    }
  `]
})
export class ModalEleccionComponent {
  constructor(private dialogRef: MatDialogRef<ModalEleccionComponent>) {}

  seleccionar(tipo: 'musica' | 'comercio') {
    this.dialogRef.close(tipo);
  }
}
