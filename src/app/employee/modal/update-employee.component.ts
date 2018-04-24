import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../shared/employee.service';
import {Employee} from '../shared/employee.model';
import {DepartmentService} from '../../department/shared/department.service';
import {Department} from '../../department/shared/department.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-update-employee',
  templateUrl: 'update-employee.component.html',
  encapsulation: ViewEncapsulation.None
})

export class UpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  departments: Observable<Department[]>;

  constructor(public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
              private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              @Inject(MAT_DIALOG_DATA) public employee: Employee,
              private fb: FormBuilder) {

    this.employeeForm = fb.group({
      first_name: [employee.first_name, Validators.required],
      last_name: [employee.last_name, Validators.required],
      phone: [employee.phone],
      salary: [employee.salary, Validators.pattern('^[0-9]+$')],
      departmentId: [employee.departmentId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  onNoClick(): void {
    this.dialogRef.close('dismiss');
  }

  editEmployee(employeeForm: FormGroup): void {
    if (employeeForm.valid) {
      if (this.employee.id) {
        this.updateEmployee(this.employeeForm.value);
      } else {
        this.createEmployee(this.employeeForm.value);
      }
    }
  }

  onDeleteClick(): void {
    if (this.employee.id) {
      this.employeeService.deleteEmployee(this.employee.id)
        .subscribe(() => {
          this.dialogRef.close('deleted');
        });
    }
  }

  private createEmployee(employeeValue: Employee): void {
    this.employeeService.addEmployee(employeeValue)
      .subscribe(() => {
        this.dialogRef.close('saved');
      });
  }

  private updateEmployee(employeeValue: Employee): void {
    this.employeeService.updateEmployee(this.employee.id, employeeValue)
      .subscribe(() => {
        this.dialogRef.close('saved');
      });
  }

  isUpdateMode(): boolean {
    return !!this.employee.id;
  }
}
