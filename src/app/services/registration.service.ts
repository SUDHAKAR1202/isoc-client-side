import { Component, Injectable } from '@angular/core';
import { Register } from '../modals/register';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL = environment.API_URL;

 


 
  constructor( private http: HttpClient) { 
  

    const csrfToken = this.getCsrfToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken ? csrfToken : ''
  });

 

  
  
  }

  getCsrfToken(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
  

  //Register new user
  registerUser(registrationData: any, headers): Observable<any> {
    return this.http.post(`${this.API_URL}/register/`, registrationData, {headers})
    .pipe(
      catchError(this.handleError)
    )
  
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