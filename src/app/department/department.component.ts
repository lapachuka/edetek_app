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
  }

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
  }

  openCreateDepartmentDialog(): void {
    const dialogRef: any = this.dialog.open(UpdateDepartmentComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUpdateDepartmentDialog(department: Department): void {
    const dialogRef: any = this.dialog.open(UpdateDepartmentComponent, {
      width: '250px',
      data: department
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The eidt dialog was closed');
    });
  }

}
