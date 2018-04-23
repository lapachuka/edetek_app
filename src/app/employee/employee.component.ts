import {Component, OnInit} from '@angular/core';
import {EmployeeService} from './shared/employee.service';
import {Employee} from './shared/employee.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone', 'actions'];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employeeService.updateEmployeeList();
    this.employees = this.employeeService.getEmployees();
  }

  openCreateEmployeeDialog(): void {

  }

  openUpdateEmployeeDialog(): void {

  }

}
