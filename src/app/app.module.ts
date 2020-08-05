import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSmartDatatableModule } from 'ngx-smart-datatable';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxSmartDatatableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
