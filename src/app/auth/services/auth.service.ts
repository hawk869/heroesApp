import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../enviroments/environments";
import {User} from "../interfaces/user.interface";

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
}
