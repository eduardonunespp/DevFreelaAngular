import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { HttpClientModule } from '@angular/common/http';
import { LdButtonModule } from 'src/app/shared/components/ld-button/ld-button.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    LdWrapperModule,
    HttpClientModule,
    LdButtonModule,
  ],
})
export class ListModule {}
