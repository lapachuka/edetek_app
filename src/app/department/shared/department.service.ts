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
  private readonly departmentUrl: string = Api.URL + '/users/departments';

  constructor(private http: HttpClient) {

  }

  getDepartments(): Observable<Department[]> {
    return this.departmentSubject.asObservable();
  }

  addDepartment(department): Observable<Department> {
    return this.http.post<Department>(this.departmentUrl, department)
      .pipe(tap(() => this.refreshDepartmentList()));
  }

  deleteDepartment(departmentId: number): Observable<Department> {
    return this.http.delete<Department>(this.departmentUrl + '/' + departmentId)
      .pipe(tap(() => this.refreshDepartmentList()));
  }

  updateDepartment(departmentId: number, department: Department): Observable<Department> {
    return this.http.put<Department>(this.departmentUrl + '/' + departmentId, department)
      .pipe(tap(() => this.refreshDepartmentList()));
  }

  refreshDepartmentList(): void {
    this.http.get(this.departmentUrl)
      .subscribe(departments => this.departmentSubject.next(<Department[]>departments));
  }

}
