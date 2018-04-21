import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartments(): any {
    return this.http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments');
  }


}
