import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactEntity } from '../models/contactEntity';

@Injectable({
  providedIn: 'root',
})
export class ContactBookService {
  private _contactList: ContactEntity[] = [];

  contactList$ = new BehaviorSubject<ContactEntity[]>([]);

  readonly localStorageKey = 'contacts';

  constructor() {}

  get contacts() {
    if (this._contactList.length === 0) {
      const itemsInString = localStorage.getItem(this.localStorageKey);
      if (itemsInString !== null) {
        this._contactList = JSON.parse(itemsInString);
      }
    }
    return this._contactList;
  }
}
