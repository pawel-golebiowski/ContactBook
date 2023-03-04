import { Component, OnInit } from '@angular/core';
import { ContactBookService } from './services/contact-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clientTHTG';

  constructor(private _contactBookService: ContactBookService) {}

  ngOnInit(): void {
    this._contactBookService.getContacts();
  }
}
