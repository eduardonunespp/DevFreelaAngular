import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../types';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  postUser(payload: User) {
    return this.http.post(`${environment.apiUrl}/users`, payload);
  }

  getUser() {
    return this.http.get(`${environment.apiUrl}/users`);
  }
}
