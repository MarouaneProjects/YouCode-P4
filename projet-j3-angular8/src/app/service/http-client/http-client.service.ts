import { User } from '../../admin/users/User';
import { Book } from '../../admin/books/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers() {
    return this.httpClient.get<User[]>('http://localhost:2424/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:2424/users/add', newUser);
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:2424/users/' + id);
  }

  getBooks() {
    return this.httpClient.get<Book[]>('http://localhost:2424/books/get');
  }

  addBook(newBook: Book) {
    return this.httpClient.post<Book>('http://localhost:2424/books/add', newBook);
  }

  deleteBook(id) {
    return this.httpClient.delete<Book>('http://localhost:2424/books/' + id);
  }

  updateBook(updatedBook: Book) {
    return this.httpClient.put<Book>('http://localhost:2424/books/update', updatedBook);
  }
}
