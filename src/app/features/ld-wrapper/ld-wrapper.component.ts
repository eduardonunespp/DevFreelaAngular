import { Component, Input } from '@angular/core';
import { ldwrapper } from './types';

@Component({
  selector: 'ld-wrapper',
  templateUrl: './ld-wrapper.component.html',
  styleUrls: ['./ld-wrapper.component.scss'],
})
export class LdWrapperComponent {
  @Input() type: ldwrapper = 'two-col';
}
