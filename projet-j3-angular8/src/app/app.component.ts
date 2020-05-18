import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './service/authentication.service';
import { Admin } from './login/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet-j3-angular-springboot';

  currentAdmin: Admin;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentAdmin.subscribe(x => this.currentAdmin = x);
}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
}
