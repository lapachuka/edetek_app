import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Employee} from './employee.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmployeeService {
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  updateEmployeeList(): void {
    this.http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees')
      .subscribe(employees => this.employeesSubject.next(employees));
  }
}
