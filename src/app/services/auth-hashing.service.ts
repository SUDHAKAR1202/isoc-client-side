import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class AuthHashingService {
    constructor() {}

    private key = 'sk@897';

    // Hash the username
    hashUsername(username: string): string {
        return CryptoJS.SHA256(username).toString(CryptoJS.enc.Hex);
      }
    
      // Hash the password
      hashPassword(password: string): string {
        return CryptoJS.HmacSHA256(password, this.key).toString(CryptoJS.enc.Hex);
      }
}