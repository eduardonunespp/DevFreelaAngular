import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing.module';
import { LdHeaderModule } from 'src/app/features/ld-header/ld-header.module';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    LdHeaderModule,
    LdButtonModule
  ]
})
export class RegisterModule { }
