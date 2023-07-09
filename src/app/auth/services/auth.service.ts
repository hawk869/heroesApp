import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../enviroments/environments";
import {User} from "../interfaces/user.interface";
import {Observable, tap} from "rxjs";
import * as http from "http";

@Injectable({ providedIn: 'root'})
export class AuthService {

  private baseUrl = environments;
  private user?: User;
  constructor(
    private http: HttpClient
  ) {
  }
  get currentUser(): User|undefined {
    if ( !this.user ) return undefined;
    // return {...this.user};
    return structuredClone( this.user );
  }
  login( email: string, password: string ): Observable<User> {
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', user.id.toString()))
      );
  }
}
