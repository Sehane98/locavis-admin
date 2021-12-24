import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import filter from '../../shared/utils/filter.js';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  reformatParams(params: any = {}) {
    let new_params = {};
    Object.keys(params).forEach((key) => {
      new_params[filter[key] ? filter[key] : key] = params[key];
    });
    return new_params;
  }
  
  clean(params) {
    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === null || params[key] === {} || params[key] === 0) {
        delete params[key];
      }
    });
    return params;
  }

  get(url: string, params: any = {}, observe: any = 'body'): Observable<any> {
    if (params !== {}) {
      params = this.reformatParams(params);
    }
    return this.http.get(url, {
      params: this.clean(params),
      observe: 'response',
    });
  }

  upload(file: any, url: string, root: string = 'root'): Observable<any> {
    var f = new FormData();
    f.append('document', file);
    return this.http.post(url, f);
  }

  post(url: string, body: {} = {}, params: {} = {}, root: string = 'root'): Observable<any> {
    return this.http.post(url, body, {
      params: this.clean(params),
      observe: 'response',
    });
  }

  put(url: string, params: {} = {}, root: string = 'root'): Observable<any> {
    return this.http.put(url, params);
  }

  delete(url: string, params: {} = {}, root: string = 'root'): Observable<any> {
    return this.http.delete(url, params);
  }
}
