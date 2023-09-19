import { Component, OnInit } from '@angular/core';
import { User } from './types';
@Component({
  selector: 'ld-header',
  templateUrl: './ld-header.component.html',
  styleUrls: ['./ld-header.component.scss'],
})
export class LdHeaderComponent implements OnInit {
  hasUser: boolean = true;

  user: User = {};

  constructor() {}

  ngOnInit(): void {
    this.buildHeader();
  }

  buildHeader() {
    if (this.checkIfUserIsLogged()) {
      this.hasUser = true;
      this.user.name = localStorage.getItem('userName') || '';
      this.user.role = localStorage.getItem('role') || '';
    } else {
      this.hasUser = false;
    }
  }

  checkIfUserIsLogged() {
    return localStorage.getItem('userName') && localStorage.getItem('role');
  }
}
