//@ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { msg } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegisterService } from './services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  msg = msg;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  registerForm: FormGroup = this.fb.group({
    role: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    console.log(this.registerService.getUser().subscribe((data) => 
    console.log(data)
    ))
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
              localStorage.setItem('userName', response.fullName);
              localStorage.setItem(
                'role',
                response.role === 'dev' ? 'Desenvolvedor' : 'Cliente'
              );
              localStorage.setItem('idClient', response.id);
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

    // Enviar para API
    fetch(`${this.api}/users`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        Swal.fire({
          title: 'Bom Trabalho!',
          text: 'Cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok!',
        }).then((result) => {
          localStorage.setItem('userName', response.fullName);
          localStorage.setItem(
            'role',
            response.role === 'dev' ? 'Desenvolvedor' : 'Cliente'
          );
          localStorage.setItem('idClient', response.id);
          if (result.isConfirmed) {
            window.location.href = 'list.html';
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Falha!',
          text: 'Erro ao acessar a api',
          icon: 'error',
          confirmButtonText: 'Ok!',
        });
      });
  }

  isInvalid(inputName: string, validatorName: string) {
    const formControl: any = this.registerForm.get(inputName);
    if (formControl.errors !== null) {
      return (
        formControl.errors[validatorName] &&
        this.registerForm.get(inputName)?.touched
      );
    }
  }
}
