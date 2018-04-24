import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeService} from './shared/employee.service';
import {EmployeeComponent} from './employee.component';

const routes: Routes = [{
  path: '',
  component: EmployeeComponent
}];

@NgModule({
  providers: [EmployeeService],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
