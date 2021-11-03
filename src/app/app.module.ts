import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngmaterialModule } from './angmaterial/angmaterial.module';
import { EmployeeComponent } from './Components/employee/employee.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngmaterialModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
