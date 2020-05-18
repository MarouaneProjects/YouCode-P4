import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Admin } from './../login/admin';
import { AdminService } from '../service/admin.service';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loading = false;
    admins: Admin[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {

        this.loading = true;
        this.adminService.getAll().pipe(first()).subscribe(admins => {
            this.loading = false;
            this.admins = admins;
        });
    }
}



