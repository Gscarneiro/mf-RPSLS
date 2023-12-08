import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API: string = 'https://localhost:44374/';

  constructor(private http: HttpClient) {}

  serialize(url: string, obj: any): string {
    var str: string[] = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (!url.includes(':' + p)) {
          var v = obj[p];
        } else {
          url = url.replace(':' + p, obj[p]);
        }
      }
    }
    return url + '?' + str.join('&').replace('&&', '&');
  }

  get(path: string, params?: any): Observable<Object> {
    return this.http.get(this.API + path, { params: params });
  }

  post(path: string, body?: any, params?: any): Observable<Object> {
    return this.http.post(this.API + path, body, { params: params });
  }

  put(path: string, body?: any, params?: any): Observable<Object> {
    return this.http.put(this.API + path, body, { params: params });
  }
}
