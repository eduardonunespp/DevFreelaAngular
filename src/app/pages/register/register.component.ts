import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './services/service.service';
import { msg, Helpers } from '../../shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  msg = msg;
  helpers = Helpers;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  registerForm: FormGroup = this.fb.group({
    role: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    console.log(
      this.registerService.getUser().subscribe((data) => console.log(data))
    );
  }

  toogleRole(role: 'dev' | 'cliente') {
    this.registerForm.get('role')?.setValue(role);
  }

  cadastrar() {
    if (this.registerForm.valid) {
      let payload = this.registerForm.value;

      this.registerService.postUser(payload).subscribe(
        (response) => {
          Swal.fire({
            title: 'Bom Trabalho!',
            text: 'Cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok!',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('userName', payload.fullName);
              localStorage.setItem(
                'role',
                payload.role === 'dev' ? 'Desenvolvedor' : 'Cliente'
              );
              localStorage.setItem('idClient', payload.id);

              this.router.navigateByUrl('list');
            }
          });
        },
        (error) => {
          Swal.fire({
            title: 'Falha!',
            text: 'Algo de errado aconteceu, se o problema persistir, consulte o administrador do sistema',
            icon: 'error',
            confirmButtonText: 'Ok!',
          });
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
