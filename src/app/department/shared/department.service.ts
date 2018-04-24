import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from './department.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Api} from '../../config/api';

@Injectable()
export class DepartmentService {
  private departmentSubject: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  private readonly departmentUlr: string = Api.URL + '/users/departments';
  constructor(private http: HttpClient) {

  }

  getDepartments(): Observable<Department[]> {
    return this.departmentSubject.asObservable();
  }

  addDepartment(department): Observable<Department> {
    return this.http.post<Department>(this.departmentUlr, department)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  deleteDepartment(departmentId: number): Observable<Department> {
    return this.http.delete<Department>(this.departmentUlr + '/' + departmentId)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  updateDepartment(departmentId: number, department: Department): Observable<Department> {
    return this.http.put<Department>(this.departmentUlr + '/' + departmentId, department)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  updateDepartmentsList(): void {
    this.http.get(this.departmentUlr)
      .subscribe(departments => this.departmentSubject.next(<Department[]>departments));
  }

}
