import { Component, OnInit } from '@angular/core';
import { ListItem } from './types';
import { environment } from 'src/environments/environment.prod';
import { ListService } from './service/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list: ListItem[] = [];
  products: string = 'w';

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    // window.onload = function () {
    //   document.querySelector('#name').innerText =
    //     localStorage.getItem('userName');
    //   document.querySelector('#role').innerText = localStorage.getItem('role');

    // };
    this.getProjects();
  }

  getProjects() {
    this.listService.getList().subscribe((response) => {
      this.list = response;
      this.buildTable();
    });
  }

  // getProjects() {
  //   this.listService.getList()
  //     .then((response) => response.json())
  //     .then((response: ListItem[]) => {
  //       this.list = response
  //       this.buildTable()
  //     });
  // }

  buildTable() {
    (document.querySelector('#table-body') as any).innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    console.log(idClient);

    this.list = this.list.filter(
      (listItem: ListItem) => listItem.idClient.toString() === idClient
    );

    this.list.forEach((listItem) => {
      let template = `
            <div class="row">
                <div class="title-description">
                    <h6 class="title">${listItem.title}</h6>
                    <p class="description">${listItem.description}</p>
                </div>
                <div class="price">R$ ${listItem.totalCost}</div>
                <div class="actions">
                    <span class="edit material-icons" onclick="goToEdit(${listItem.id})">edit</span>
                    <span class="delete material-icons" onclick="deleteProject(${listItem.id})">delete_outline</span>
                </div>
            </div>
        `;

      (document.querySelector('#table-body') as any).insertAdjacentHTML(
        'beforeend',
        template
      );
    });
  }
}
