import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './error-handler.service';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticatedUser: any;
  rolebase: string = null;
  islogin: boolean = false;
  baseUrl = this.ip.ip + ":2138/dristiaadmintask/users/signin";
  // baseUrl = this.ip.ip + ":2137/admintask/users/signin";
  userName = null;
  token: string = localStorage.getItem('token') || null;
  refresh_Token = null;

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private router: Router) {
  }


  getJwtToken(): string {
    return this.token;
  }

  // refreshToken(): Observable<any> {
  //   return this.http.get<any>(`${this.ip.ip}:2138/admintask/users/generateToken/${this.decoded.sub}`).pipe(take(1), tap(res => {
  //     console.log(res);
  //     if (res) {
  //       this.refresh_Token = res['tokenName'];
  //       console.log("refresh token");
  //       console.log(this.refresh_Token);
  //       if (this.refresh_Token) {
  //         localStorage.setItem('token', this.refresh_Token);
  //         this.token = this.refresh_Token;
  //       }
  //     }
  //   }));
  // }

  // decodeToken(): boolean {
  //   if (this.token != null && this.token != undefined && this.token.length != 0) {
  //     this.decoded = jwt_decode(this.token);
  //     /* Uppercase for username */
  //     this.userName = this.decoded.sub.charAt(0).toUpperCase() + this.decoded.sub.slice(1);
  //     console.log(this.decoded);
  //     const role = this.decoded.auth[0].authority;
  //     console.log(role);
  //     this.rolebase = role;
  //     this.islogin = Boolean(this.rolebase);
  //     return true;
  //   }
  //   else
  //     return false;
  // }


  authenticate(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    return this.http.post(`${this.baseUrl}`, { username, password }, { headers }).pipe(map(res => {
      if (res) {
        console.log(res);
        this.token = res['token'];
        // this.decodeToken();
        const email = res['email'];
        localStorage.setItem('token', this.token);
        localStorage.setItem('email', email);
        // this.datashare.email.next(email);
        // console.log("datashare.email ", this.datashare.email);
        this.islogin = Boolean(this.rolebase);
        return true;
      }
      else
        return false;
    }), catchError(this.errHandler.handleError));
  }


  /* without login */
  forgotPassword(userName) {
    return this.http.post(`${this.ip.ip}:2138/admintask/users/forgotPassword/${userName}`, null)
      .pipe(catchError(this.errHandler.handleError));
  }

  resetPassword(username: string, pwd: string) {
    /* const responseType: Object = {
      responseType: 'text'
    } */
    return this.http.put<any>(`${this.ip.ip}:2138/admintask/users/resetPassword/${username}`, { "newPassword": pwd })
      .pipe(catchError(this.errHandler.handleError));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.token = null;
    this.rolebase = null;
    this.islogin = false;
  }
}
