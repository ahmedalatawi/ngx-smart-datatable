import { NgModule } from '@angular/core';
import { NgxSmartDatatableComponent } from './ngx-smart-datatable.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [NgxSmartDatatableComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxSmartDatatableComponent]
})
export class NgxSmartDatatableModule { }
