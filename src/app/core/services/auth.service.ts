import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConf } from '../http/http.conf';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { LsItems } from '../enums/ls-item.enum';
import { removableLsDataConf } from '../conf/removable-ls-data.conf';
import { ApiEndpoint, HttpMethod } from '../decorators/ApiEndpoint';
import { Authority } from '../enums/authority.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router) { }

  @ApiEndpoint({
    method: HttpMethod.POST,
    name: 'login',
    url: HttpConf.URL.auth
  })

  login(body: any): Observable<any> {
    return this.http.post(`${HttpConf.URL.auth}`, body);
  }

  setDeliveryAuthData(jwtToken: string): void {
    const first = jwtToken.indexOf('.');
    const second = jwtToken.lastIndexOf('.');
    const payload = jwtToken.substring(first + 1, second);
    const decodedJSON = JSON.parse(Base64.decode(payload));
    localStorage.setItem(LsItems.LOCAVIS_ADMIN_AUTH_DATA, JSON.stringify(decodedJSON));
  }

  logout(): void {
    this.router.navigate(['/auth']);
  }

  setToken(jwtToken: string): void {
    localStorage.setItem(LsItems.LOCAVIS_ADMIN_AUTH_TOKEN, jwtToken);
  }

  getToken(): string | null {
    if (localStorage.getItem(LsItems.LOCAVIS_ADMIN_AUTH_DATA)) {
      localStorage.getItem(LsItems.LOCAVIS_ADMIN_AUTH_DATA)

      const expDate = +JSON.parse(localStorage.getItem(LsItems.LOCAVIS_ADMIN_AUTH_DATA)!).exp;
      const currDate = new Date().getTime() / 1000;

      if (currDate > expDate) {
        this.logout();
        return null;
      }
    } else {
      this.logout();
      return null;
    }

    return localStorage.getItem(LsItems.LOCAVIS_ADMIN_AUTH_TOKEN);
  }

  getUserName(): string {
    const authData = this.getDeliveryAuthData();
    return authData ? authData.sub : '';
  }

  getAuthorities() {
    const authData = this.getDeliveryAuthData();
    return authData ? authData  : [];
  }

  clearLsItems(): void {
    removableLsDataConf.forEach(v => {
      localStorage.removeItem(v);
    });
  }

  private getDeliveryAuthData(): any {
    return JSON.parse(localStorage.getItem(LsItems.LOCAVIS_ADMIN_USER)!);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setCurrentUser(user): void {
    localStorage.setItem(LsItems.LOCAVIS_ADMIN_USER, JSON.stringify(user));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(LsItems.LOCAVIS_ADMIN_USER)!);
  }

}
