import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  getLocalJson():Observable<any>{
    return this.http.get('./assets/json/liaoning1.json')
  }
}
