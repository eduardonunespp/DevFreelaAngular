import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditComponent } from './create-edit.component';
import { CreateEditRoutingModule } from './create-edit.routing.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [CreateEditComponent],
  imports: [
    CommonModule,
    CreateEditRoutingModule,
    LdWrapperModule,
    LdButtonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class CreateEditModule {}
