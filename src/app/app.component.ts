import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactBookService } from './services/contact-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _contactBookService: ContactBookService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this._contactBookService.getContacts();
  }

  navigateToDashboardView() {
    this.route.navigateByUrl('dashboard');
  }

  navigateToAddContactView() {
    this.route.navigateByUrl('add-contact');
  }
}
