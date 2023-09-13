import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing.module';
import { LdWrapperModule } from 'src/app/features/ld-wrapper/ld-wrapper.module';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './service/list.service';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ListRoutingModule, LdWrapperModule, HttpClientModule],
})
export class ListModule {}
