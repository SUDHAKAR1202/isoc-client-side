import { Injectable } from '@angular/core';
import { Subject, Observable ,BehaviorSubject} from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private raisedService = new BehaviorSubject<any>('Sudhakar');

  constructor() { 

  }

  setraisedService(data:any){
    this.raisedService.next(data)
    console.log(data);
  }
  getraisedService(){
    return this.raisedService.asObservable();
  }
}
