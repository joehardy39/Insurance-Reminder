import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/cust';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustService {

  constructor(private http: HttpClient) { }


  register(firstname: any, Lname: any, email: any, type: any ): Observable<any> {
    return this.http.post(
      AUTH_API ,
      {
        firstname,
        Lname,
        email,
        type
      },
      httpOptions
    );
  }

}
