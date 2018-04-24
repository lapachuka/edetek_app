import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import {EmployeeService} from './shared/employee.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {UpdateEmployeeComponent} from './modal/update-employee.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [EmployeeComponent, UpdateEmployeeComponent],
  providers: [EmployeeService],
  entryComponents: [UpdateEmployeeComponent]
})
export class EmployeeModule { }
