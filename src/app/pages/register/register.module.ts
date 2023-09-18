import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing.module';
import { LdHeaderModule } from 'src/app/features/ld-header/ld-header.module';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    LdHeaderModule,
    LdButtonModule,
    LdWrapperModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
