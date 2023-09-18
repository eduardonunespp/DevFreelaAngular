import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditComponent } from './create-edit.component';
import { CreateEditRoutingModule } from './create-edit.routing.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { HttpClientModule } from '@angular/common/http';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';

@NgModule({
  declarations: [CreateEditComponent],
  imports: [CommonModule, CreateEditRoutingModule, LdWrapperModule, LdButtonModule, HttpClientModule],
})
export class CreateEditModule {}
