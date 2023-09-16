import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  urlSearchParams: any = new URLSearchParams(window.location.search);
  id!: string;

  // Type: 'create' | 'edit'
  screenType!: 'edit' | 'create'

  constructor(private router: Router){
    this.id = history.state.id
    this.screenType = this.id ? 'edit' : 'create'
  }

  ngOnInit(): void {
    this.setScreenTypeTexts();
    this.fillInputs();

    console.log(this.screenType)
  }

  createOrEdit() {
    // Inicia a massa de dados (payload)
    let payload = {
        title: (document.querySelector("#title") as any).value,
        totalCost: (document.querySelector("#totalCost") as any).value,
        description: (document.querySelector("#description") as any).value,
        idClient: localStorage.getItem("idClient")
    }

    // Enviar para API
    fetch(`${environment.apiUrl}/projects${this.screenType === 'edit' ? ('/' + this.id) : ''}`, {
            method: this.screenType === 'edit' ? 'PUT' : 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (this.screenType === 'edit') {
                alert('Editado com sucesso!');
            } else {
                alert('Cadastrado com sucesso!');
            }

            this.router.navigateByUrl('list')
        })
}

  fillInputs() {
    if (this.screenType === 'edit') {
      fetch(
        `${environment.apiUrl}/projects/${this.id}`
      )
        .then((response) => response.json())
        .then((project) => {
          (document.querySelector('#title') as any).value = project.title;
          (document.querySelector('#totalCost') as any).value =
            project.totalCost;
          (document.querySelector('#description') as any).value =
            project.description;
        });
    }
  }

  setScreenTypeTexts() {
    // MODO CRIAR
    if (this.screenType == 'create') {
      (document.querySelector('#main-title') as any).innerText =
        'Vamos cadastrar seu novo projeto!';
      (document.querySelector('#action-button') as any).innerText = 'Cadastrar';
    }

    // MODO EDITAR
    if (this.screenType == 'edit') {
      (document.querySelector('#main-title') as any).innerText =
        'Editar projeto';
      (document.querySelector('#action-button') as any).innerText = 'Salvar';
    }
  }
}
