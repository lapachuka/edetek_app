import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-update-department',
  templateUrl: 'update-department.component.html'
})

export class UpdateDepartmentComponent {


  constructor(public dialogRef: MatDialogRef<UpdateDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
