import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-registro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  
  ]
})
export class RegistroFormComponent {
  registroForm: FormGroup;
  hidePassword = true;
  hideConfirm = true;
  cargando = false;
  registroExitoso = false;


  
  irASeleccionCuenta() {
    this.router.navigate(['/cuentas']);
  }
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private snackBar: MatSnackBar
    
  ) {
    const tipoDefault = history.state.tipo === 'musico' ? 'musico' : 'comercio';

    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      tipo: [tipoDefault, Validators.required],
      terminos: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registroForm.controls;
    
  }
get tieneMayuscula(): boolean {
  return /[A-Z]/.test(this.f['password'].value || '');
}

get tieneNumero(): boolean {
  return /\d/.test(this.f['password'].value || '');
}

get tieneEspecial(): boolean {
  return /[^\w\s]/.test(this.f['password'].value || '');
}

get tieneMinimo8(): boolean {
  return (this.f['password'].value || '').length >= 8;
}
get todosValidos(): boolean {
  return this.tieneMinimo8 && this.tieneMayuscula && this.tieneNumero && this.tieneEspecial;
}


  async registrar() {
    if (this.registroForm.invalid) return;

    this.cargando = true;
    const { email, password, tipo } = this.registroForm.value;

    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      const ref = doc(this.firestore, 'usuarios', cred.user.uid);
      await setDoc(ref, {
        uid: cred.user.uid,
        email,
        tipo,
        creado: new Date()
      });

      this.snackBar.open('Cuenta creada exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      this.registroExitoso = true;
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    } catch (err) {
      console.error(err);
      this.snackBar.open('Error al registrar la cuenta', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    } finally {
      this.cargando = false;
    }
  }
}
