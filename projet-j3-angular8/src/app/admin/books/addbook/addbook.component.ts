import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../../books/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpClientService} from '../../../service/http-client/http-client.service';



@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  @Input()

  book: Book;

  @Output()
  bookAddedEvent = new EventEmitter();


  private selectedFile;
  imgURL: any;



  constructor(private httpClientService: HttpClientService,
              private activedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  saveBook() {
    if ( this.book.id == null) {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:2424/books/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addBook(this.book).subscribe(
            (book) => {
              this.bookAddedEvent.emit();
              this.router.navigate(['admin', 'books']);
            }
          );
          alert('Image uploaded successfully');
        } else {
          alert('Image not uploaded successfully');
        }
      }
      );
    } else {
      this.httpClientService.updateBook(this.book).subscribe(
        (book) => {
          this.bookAddedEvent.emit();
          this.router.navigate(['admin', 'books']);
        }
      );
    }
  }



}


