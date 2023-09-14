import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ListItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<ListItem[]>(`${environment.apiUrl}/projects`);
  }

  deleteProject(id: string | number) {
    return this.http.delete(`${environment.apiUrl}/projects`);
  }

  // editProjects(id: string | number) {
  //   return this.http.put(`${environment.apiUrl}/projects/${id}`);
  // }
}
