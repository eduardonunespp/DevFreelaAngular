import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { CreateEditService } from './service/create-edit.service';
import { msg, Helpers } from 'src/app/shared/utils';
import { ListItem } from '../list/types';

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
  msg = msg;
  helpers = Helpers;

  constructor(
    private router: Router,
    private createEditService: CreateEditService,
    private fb: FormBuilder
  ) {
    this.id = history.state.id;
    this.screenType = this.id ? 'edit' : 'create';
  }

  projectCreateEditForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    totalCost: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.setScreenTypeTexts();
    this.fillInputs();

    console.log(this.screenType);
  }

  createOrEdit() {
    if (this.projectCreateEditForm.valid) {
      let payload: ListItem = this.projectCreateEditForm.value;
      payload.idClient = localStorage.getItem('idClient')!;

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
    } else {
      this.projectCreateEditForm.markAllAsTouched();
    }
  }

  fillInputs() {
    if (this.screenType === 'edit') {
      this.createEditService.getProjectsById(this.id).subscribe((project) => {
        this.projectCreateEditForm.patchValue({
          title: project.title,
          totalCost: project.totalCost,
          description: project.description,
        });
      });

      fetch(`${environment.apiUrl}/projects/${this.id}`)
        .then((response) => response.json())
        .then((project) => {
          this.projectCreateEditForm.patchValue({
            title: project.title,
            totalCost: project.totalCost,
            description: project.description,
          });
        });
    }
  }

  setScreenTypeTexts() {
    if (this.screenType == 'create') {
      this.title = 'Vamos cadastrar seu novo projeto';
      this.actionButtonText = 'Cadastrar';
    }

    if (this.screenType == 'edit') {
      this.title = 'Edite seu projeto';
      this.actionButtonText = 'Salvar';
    }
  }
}
