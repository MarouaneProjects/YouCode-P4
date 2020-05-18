import { Component, OnInit } from '@angular/core';
import { User } from '../users/User';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../service/http-client/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<User>;
  action: string;
  selectedUser: User;
  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        // tslint:disable-next-line: no-string-literal
        this.action = params['action'];
        // tslint:disable-next-line: no-string-literal
        const selectedUserId = params['id'];
        if (selectedUserId) {
          this.selectedUser = this.users.find(user => user.id === +selectedUserId);
        }
      }
    );

  }

  viewUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }

}



