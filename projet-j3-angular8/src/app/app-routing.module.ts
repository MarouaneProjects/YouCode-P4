import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UsersComponent } from './admin/users/users.component';
import { BooksComponent } from './admin/books/books.component';
import { ShopbookComponent } from './shopbook/shopbook.component';
import {AuthGuardService} from './service/auth-gaurd.service';
import {AdminComponent} from './admin/admin.component';




const routes: Routes = [
  { path: '', component: UsersComponent, canActivate:[AuthGuardService] },
  { path: '', component: BooksComponent, canActivate:[AuthGuardService] },

  { path: 'dashboard', component: AdminComponent },
  { path: 'admin/books', component: BooksComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'shop', component: ShopbookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

