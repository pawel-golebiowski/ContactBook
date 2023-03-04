import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource: ContactEntity[] = [];
  readonly displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthday',
    'pictureUrl',
    'actions',
  ];

  constructor(private _contactBookService: ContactBookService) {}

  ngOnInit(): void {
    this._contactBookService.contactList$.subscribe(
      (contacts: ContactEntity[]) => {
        this.dataSource = contacts;
      }
    );
  }
}
