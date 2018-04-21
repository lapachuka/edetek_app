import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeService} from './shared/employee.service';

const routes: Routes = [];

@NgModule({
  providers: [EmployeeService],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
