import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card class="max-w-md mx-auto mt-20 p-6">
      <h2 class="text-xl font-semibold mb-4">Iniciar sesión</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required />
        </mat-form-field>

        <mat-form-field class="w-full mt-4">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" formControlName="password" required />
        </mat-form-field>

        <button mat-raised-button color="primary" class="w-full mt-6" [disabled]="form.invalid">
          Ingresar
        </button>
      </form>
    </mat-card>
  `
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.authService.login(email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => alert('Error: ' + err.message));
  }
}
