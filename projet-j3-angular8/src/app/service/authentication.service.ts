import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../admin/users/User';
import { Book } from '../admin/books/Book';
import { Admin } from '../login/admin';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentAdminSubject: BehaviorSubject<Admin>;
    public currentAdmin: Observable<Admin>;

  constructor(
    private http: HttpClient

  ) {
    this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
}

login(username: string, password: string) {
  return this.http.post<any>(`${environment.apiUrl}/login/authenticate`, { username, password })
      .pipe(map(admin => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          admin.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currenAdmin', JSON.stringify(admin));
          this.currentAdminSubject.next(admin);
          return admin;
      }));
}






logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentAdmin');
  this.currentAdminSubject.next(null);

}
}

