import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UsersDataService {
    url = 'http://localhost:3001/clients';
    constructor(private http: HttpClient) {}
    users() {
        return this.http.get(this.url);
    }
}