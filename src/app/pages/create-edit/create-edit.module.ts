import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditComponent } from './create-edit.component';
import { CreateEditRoutingModule } from './create-edit.routing.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { HttpClientModule } from '@angular/common/http';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxMaskPipe,
  NgxMaskDirective,
  provideNgxMask,
  IConfig,
} from 'ngx-mask';

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
