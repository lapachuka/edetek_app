import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../shared/department.service';
import {Department} from '../shared/department.model';

@Component({
  selector: 'app-update-department',
  templateUrl: 'update-employee.component.html',
  styleUrls: ['update-department.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UpdateDepartmentComponent {

  departmentForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateDepartmentComponent>,
              private departmentService: DepartmentService,
              @Inject(MAT_DIALOG_DATA) public department: Department,
              private fb: FormBuilder) {

    this.departmentForm = fb.group({
      name: [department.name, Validators.required],
      description: [department.description]
    });
  }

  onNoClick(): void {
    this.dialogRef.close('dismiss');
  }

  editDepartment(departmentForm: FormGroup): void {
    if (departmentForm.valid) {
      this.department.id ? this.updateDepartment(this.departmentForm.value) : this.createDepartment(this.departmentForm.value);

    }
  }

  onDeleteClick(): void {
    if (this.department.id) {
      this.departmentService.deleteDepartment(this.department.id)
        .subscribe(() => {
          this.dialogRef.close('deleted');
        });
    }
  }

  createDepartment(departmentValue: Department): void {
    this.departmentService.addDepartment(departmentValue)
      .subscribe(() => {
        this.dialogRef.close('saved');
      });
  }

  updateDepartment(departmentValue: Department): void {
    this.departmentService.updateDepartment(this.department.id, departmentValue)
      .subscribe(() => {
        this.dialogRef.close('saved');
      });
  }

  isUpdateMode(): boolean {
    return !!this.department.id;
  }
}
