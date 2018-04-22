import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {DepartmentComponent} from './department.component';
import {DepartmentService} from './shared/department.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {UpdateDepartmentComponent} from './modal/update-department.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [DepartmentService],
  declarations: [DepartmentComponent, UpdateDepartmentComponent],
  entryComponents: [UpdateDepartmentComponent]

})
export class DepartmentModule {
}
