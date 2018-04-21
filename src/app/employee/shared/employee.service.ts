import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): any {
    return this.http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees');
  }
}
