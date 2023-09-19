import { Component, OnInit } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { ListService } from './service/list.service';
import { ProjectItem } from 'src/app/shared/types';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list: ProjectItem[] = [];
  isLoadingTable: boolean = true;

  constructor(private listService: ListService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
  }

  goToEdit(id: string | any) {
    this.router.navigateByUrl(`/project-create-edit/${id}`);
  }

  deleteProject(id: string | any) {
    this.listService.deleteProject(id).subscribe((response) => {
      this.list = this.list.filter((project) => project.id != id);

      this.buildTable();
    });
  }

  getProjects() {
    this.listService.getProjects().subscribe((response) => {
      console.log(response);
      this.list = response;
      this.buildTable();
      this.isLoadingTable = false;
    });
  }

  buildTable() {
    const idClient = localStorage.getItem('idClient');

    console.log(idClient);

    this.list = this.list.filter(
      (listItem: ProjectItem) => listItem.idClient!.toString() === idClient
    );
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  redirectToWithParams(url: string, id: string | undefined) {
    const dataParams: NavigationBehaviorOptions = {
      state: {
        id: id,
      },
    };

    this.router.navigate([`${url}`], dataParams);
  }
}
