import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Employee} from './employee.model';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Api} from '../../config/api';
import 'rxjs/add/observable/of';

@Injectable()
export class EmployeeService {
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private readonly employeeUrl: string = Api.URL + '/users/employees';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  updateEmployeeList(): void {
    this.http.get<Employee[]>(this.employeeUrl)
      .subscribe(employees => this.employeesSubject.next(employees));
  }

  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeeUrl + '/' + employeeId, employee)
      .pipe(tap(() => {
        this.updateEmployeeList();
      }));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return Observable.of(<Employee>{});
    /* The server didn't config right . It has CORS issue . 502
     return this.http.post<Employee>(this.employeeUrl, employee)
       .pipe(tap(() => {
         this.updateEmployeeList();
       }));
       */
  }

  deleteEmployee(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(this.employeeUrl + '/' + employeeId)
      .pipe(tap(() => {
        this.updateEmployeeList();
      }));
  }


}
