import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

 
  bookData$: Observable<Book>;

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public bookid: number,
    private bookService: BookService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.bookService.deleteBook(this.bookid).subscribe(
      () => {
      }, error => {
        console.log('Error ocurred while fetching book data : ', error);
      });
  }

  ngOnInit() {
    this.fetchBookData();
  }

  fetchBookData() {
    this.bookData$ = this.bookService.getBookById(this.bookid)
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching book data : ', error);
          return EMPTY;
        }));
  }

}
