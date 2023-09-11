//@ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registerForm: FormGroup = this.fb.group({
    role: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  checkIfAnyRoleIsChecked() {
    let list = document.getElementsByName('role');
    let counter = 0;

    for (let radioButton of list) {
      if (radioButton.checked === false) {
        counter++;
      }
    }

    return counter !== list.length;
  }

  api = 'https://64fc8b67605a026163ae9ad2.mockapi.io/api/v1';

  cadastrar() {
    // Checa se alguma role foi checada.
    if (this.checkIfAnyRoleIsChecked() === false) {
      Swal.fire('Algo de errado...', 'Marque alguma role!', 'error');
      return;
    }

    // Inicia a massa de dados (payload)
    let payload = {
      role:
        document.getElementsByName('role')[0].checked == true
          ? 'dev'
          : 'cliente',
      fullName: document.querySelector('#fullName').value,
      birthdate: document.querySelector('#birthdate').value,
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    };

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
}
