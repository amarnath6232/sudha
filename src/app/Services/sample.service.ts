import { Injectable } from '@angular/core';
import { IpService } from './ip.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { signUp, Minikit } from 'app/Model/model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SampleService {

  loggedIn = new BehaviorSubject(localStorage.getItem('login') == 'true');
  editUser = new BehaviorSubject<signUp>(null);

  baseUrl = this.ip.ip + ":3000/security";
  minikitdata = this.ip.ip + ":3000/users"
    getUsers = this.ip.ip + ":3000";
    constructor(private ip: IpService,
    private http: HttpClient) { }

  Security(register: signUp): Observable<signUp> {
    console.log(register);
    return this.http.post<signUp>(this.baseUrl + '/signup', register).pipe(
      catchError(this.handleError)
    );
  }

  isEmail(email): Observable<string> {
    console.log(email);
    return this.http.post<string>(this.baseUrl + '/signin/email', { email: email }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string) {
    //console.log(login);
    return this.http.post(this.baseUrl + '/signin', {email, password }).pipe(catchError(this.handleError))
  }


  getUser(): Observable<signUp[]> {
    return this.http.get<signUp[]>(this.getUsers + '/users').pipe(catchError(this.handleError))
  }

  deleteUser(id) {
    return this.http.delete(this.getUsers + '/users/delete/' + id).pipe(catchError(this.handleError))
  }

  updateUser(register: signUp) {
    return this.http.put(this.getUsers + '/users/update/', register).pipe(catchError(this.handleError))
  }

  //Minikit
  postMinikit(minikit: Minikit): Observable<Minikit> {
    return this.http.post<Minikit>(this.minikitdata + '/minikit', minikit).pipe(catchError(this.handleError))
  }

  getMinikit(): Observable<Minikit[]> {
    return this.http.get<Minikit[]>(this.minikitdata + '/minikit').pipe(catchError(this.handleError))
  }

  updateMinikit(minikit: Minikit) {
    return this.http.put(this.minikitdata + '/minikit/update/', minikit).pipe(catchError(this.handleError))
  }

  deleteminikit(id) {
    return this.http.delete(this.minikitdata + `/minikit/delete/${id}`).pipe(catchError(this.handleError))
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };


}
