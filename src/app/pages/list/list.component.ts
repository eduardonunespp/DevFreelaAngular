//@ts-nocheck

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  ngOnInit(): void {
    window.onload = function () {
      document.querySelector('#name').innerText =
        localStorage.getItem('userName');
      document.querySelector('#role').innerText = localStorage.getItem('role');

      this.getProjects();
    };
  }

  getProjects() {
    fetch('https://622cd1e6087e0e041e147214.mockapi.io/api/projects')
      .then((response) => response.json())
      .then((response) => {
        this.list = response;
        this.buildTable();
      });
  }

  buildTable() {
    document.querySelector('#table-body').innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    list = list.filter((el) => el.idClient === idClient);

    list.forEach((el) => {
      let template = `
            <div class="row">
                <div class="title-description">
                    <h6 class="title">${el.title}</h6>
                    <p class="description">${el.description}</p>
                </div>
                <div class="price">R$ ${el.totalCost}</div>
                <div class="actions">
                    <span class="edit material-icons" onclick="goToEdit(${el.id})">edit</span>
                    <span class="delete material-icons" onclick="deleteProject(${el.id})">delete_outline</span>
                </div>
            </div>
        `;

      document
        .querySelector('#table-body')
        .insertAdjacentHTML('beforeend', template);
    });
  }
}
