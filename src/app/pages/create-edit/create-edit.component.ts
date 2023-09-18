import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CreateEditService } from './service/create-edit.service';
import { ProjectItem } from 'src/app/shared/types';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  urlSearchParams: any = new URLSearchParams(window.location.search);
  id!: string;
  title: string = '';
  actionButtonText: string = '';
  screenType!: 'edit' | 'create';

  constructor(
    private router: Router,
    private createEditService: CreateEditService
  ) {
    this.id = history.state.id;
    this.screenType = this.id ? 'edit' : 'create';
  }

  ngOnInit(): void {
    this.setScreenTypeTexts();
    this.fillInputs();

    console.log(this.screenType);
  }

  createOrEdit() {
    console.log('sim');
    // Inicia a massa de dados (payload)
    let payload: ProjectItem = {
      title: (document.querySelector('#title') as any).value,
      totalCost: (document.querySelector('#totalCost') as any).value,
      description: (document.querySelector('#description') as any).value,
      idClient: localStorage.getItem('idClient'),
    };

    if (this.screenType === 'create') {
      this.createEditService.postProject(payload).subscribe((response) => {
        alert('Cadastrado com sucesso');
        this.router.navigateByUrl('list');
      });
    }

    if (this.screenType === 'edit') {
      this.createEditService
        .putProject(payload, this.id)
        .subscribe((response) => {
          alert('Editado com sucesso');
          this.router.navigateByUrl('list');
        });
    }
  }

  fillInputs() {
    if (this.screenType === 'edit') {
      this.createEditService
        .getProjectsById(this.id)
        .subscribe((response) => {});

      fetch(`${environment.apiUrl}/projects/${this.id}`)
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
      this.title = 'Vamos cadastrar seu novo projeto';
      this.actionButtonText = 'Cadastrar';
    }

    // MODO EDITAR
    if (this.screenType == 'edit') {
      this.title = 'Edite seu projeto';
      this.actionButtonText = 'Salvar';
    }
  }
}
