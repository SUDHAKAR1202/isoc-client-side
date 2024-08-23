import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Register } from '../modals/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private secretKey: string = 'your-secret-key'; // Use a secure key

 

  private  BASE_URL = environment.API_URL;



  constructor(private http: HttpClient) {}

  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.secretKey).toString();
  }

 

  verifyRegister(login: Register) {
    return this.http.post(`${environment.API_URL}/api/user/register/`, login).pipe(
      tap((data: any) => { 
        sessionStorage.setItem('username',data.response[0].username)

        sessionStorage.setItem('emailid',data.response[0].emailid)
        sessionStorage.setItem('password', data.response[0].password)
        if (data.authenticated) {
          sessionStorage.setItem('userObj', JSON.stringify(data.user))
        }
      }),
      catchError(this.handleError)
    )
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = ''
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg)
  }

}
