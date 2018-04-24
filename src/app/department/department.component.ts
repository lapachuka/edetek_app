import {Component, OnInit} from '@angular/core';
import {DepartmentService} from './shared/department.service';
import {Department} from './shared/department.model';
import {Observable} from 'rxjs/Observable';
import {UpdateDepartmentComponent} from './modal/update-department.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  departments: Observable<Department[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(private departmentService: DepartmentService,
              public dialog: MatDialog) {
    this.departments = this.departmentService.getDepartments();
  }

  ngOnInit() {
    this.departmentService.refreshDepartmentList();
  }

  openCreateDepartmentDialog(): void {
    this.dialog.open(UpdateDepartmentComponent, {
      width: '250px',
      data: {}
    });
  }

  openUpdateDepartmentDialog(department: Department): void {
    this.dialog.open(UpdateDepartmentComponent, {
      width: '330px',
      data: department
    });
  }

}
