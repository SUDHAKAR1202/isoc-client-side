import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = environment.API_URL;

  


  

  

  constructor(private http: HttpClient) { }



  // Login user
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login/`, loginData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle errors
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    
    // Check if err.error is an object and has a message property
    if (err.error && typeof err.error === 'object' && 'message' in err.error) {
      errMsg = err.error.message;
    } 
    // Handle specific status codes (e.g., 400, 401, 500, etc.)
    else if (err.status === 0) {
      errMsg = 'Unable to connect to the server. Please check your network connection.';
    } else {
      errMsg = `Server returned code ${err.status}, error message is: ${err.message || err.statusText}`;
    }
    
    console.error('An error occurred:', errMsg);
    return throwError(errMsg);
  }
}
