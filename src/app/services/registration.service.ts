import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

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

  registerUser(username: string, emailid: string , password: string) {
    const encryptedPassword = this.encryptPassword(password);
    const payload = {
      username: username,
      password: encryptedPassword,
      emailid: emailid
    };

    return this.http.post(`${this.BASE_URL}/register`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCsrfToken(),
      }),
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
}
