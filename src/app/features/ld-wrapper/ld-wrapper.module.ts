import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdHeaderModule } from '../ld-header/ld-header.module';
import { LdWrapperComponent } from './ld-wrapper.component';
@NgModule({
  declarations: [LdWrapperComponent],
  imports: [CommonModule, LdHeaderModule],
  exports: [LdWrapperComponent],
})
export class LdWrapperModule {}
