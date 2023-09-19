import { Component, Input } from '@angular/core';
import { ldwrapper } from './types';
import { Router } from '@angular/router';
@Component({
  selector: 'ld-wrapper',
  templateUrl: './ld-wrapper.component.html',
  styleUrls: ['./ld-wrapper.component.scss'],
})
export class LdWrapperComponent {
  @Input() type: ldwrapper = 'two-col';
  @Input() back: string = '';

  constructor(private router: Router) {}

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
