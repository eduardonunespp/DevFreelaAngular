import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ListItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  products: string = 'w';

  constructor(private service: HttpClient) {}

  getList() {
    return this.service.get<ListItem[]>(`${environment.apiUrl}/projects`);
  }
}
