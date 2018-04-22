import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from './department.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class DepartmentService {
  private departmentSubject: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  private readonly departmentUlr: string = 'http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments';

  constructor(private http: HttpClient) {

  }

  getDepartments(): Observable<Department[]> {
    return this.departmentSubject.asObservable();
  }

  addDepartment(department): Observable<Object> {
    return this.http.post(this.departmentUlr, department)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  deleteDepartment(departmentId: number): Observable<Object> {
    return this.http.delete(this.departmentUlr + '/' + departmentId)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  updateDepartment(departmentId: number, department: Department): Observable<Object> {
    return this.http.put(this.departmentUlr + '/' + departmentId, department)
      .pipe(tap(() => this.updateDepartmentsList()));
  }

  updateDepartmentsList(): void {
    this.http.get(this.departmentUlr)
      .subscribe(departments => this.departmentSubject.next(<Department[]>departments));
  }

}
