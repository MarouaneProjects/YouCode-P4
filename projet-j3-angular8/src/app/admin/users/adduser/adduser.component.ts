import { Component, OnInit, Input , EventEmitter, Output } from '@angular/core';
import { User } from '../../users/User';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../service/http-client/http-client.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userAddedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
              private router: Router) { }

  ngOnInit() {
  }

  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

  }


