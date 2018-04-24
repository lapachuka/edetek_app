import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EmployeeService} from './shared/employee.service';
import {Employee} from './shared/employee.model';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {UpdateEmployeeComponent} from './modal/update-employee.component';
import 'rxjs/add/operator/map';
import {DepartmentService} from '../department/shared/department.service';
import {Department} from '../department/shared/department.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {
  employees: Observable<Employee[]>;
  departments: Observable<Department[]>;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone', 'actions'];
  departmentId: number;

  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              public dialog: MatDialog) {
    this.employees = this.employeeService.getEmployees();
    this.departments = this.departmentService.getDepartments();
  }

  ngOnInit() {
    this.employeeService.refreshEmployeeList();
    this.departmentService.refreshDepartmentList();

  }

  openCreateEmployeeDialog(): void {
    this.dialog.open(UpdateEmployeeComponent, {
      width: '250px',
      data: {}
    });
  }

  openUpdateEmployeeDialog(employee: Employee): void {
    this.dialog.open(UpdateEmployeeComponent, {
      width: '250px',
      data: employee
    });
  }

  filterEmployeeResult(departmentId: number): void {
    this.employees = this.employeeService.getEmployees()
      .map(employees => {
        if (departmentId) {
          return employees.filter(employee => employee.departmentId === departmentId);
        } else {
          return employees;
        }
      });
  }

}
