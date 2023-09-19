import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectItem } from 'src/app/shared/types';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateEditService {
  constructor(private http: HttpClient) {}
  getProjectsById(id: number | string) {
    return this.http.get<ProjectItem>(`${environment.apiUrl}/projects/${id}`);
  }

  postProject(data: ProjectItem) {
    return this.http.post(`${environment.apiUrl}/projects`, data);
  }

  putProject(data: ProjectItem, id: string | number) {
    return this.http.put(`${environment.apiUrl}/projects/${id}`, data);
  }

  //Método alternativo
  putOrPost(data: ProjectItem, resquest: 'POST' | 'PUT', id?: string) {
    if (resquest === 'POST') {
      return this.http.post(`${environment.apiUrl}`, data);
    } else if (resquest === 'PUT') {
      return this.http.put(`${environment.apiUrl}/${id}`, data);
    } else {
      throw new Error('Método de solicitação desconhecido');
    }
  }
}
