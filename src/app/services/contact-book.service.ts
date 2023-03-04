import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactEntity } from '../models/contactEntity';

@Injectable({
  providedIn: 'root',
})
export class ContactBookService {
  private _contactList: ContactEntity[] = [];
  private readonly localStorageKey = 'contacts';

  contactList$ = new BehaviorSubject<ContactEntity[]>([]);

  constructor() {}

  getContacts() {
    if (this._contactList.length === 0) {
      const stringifiedContacts = localStorage.getItem(this.localStorageKey);
      if (stringifiedContacts !== null)
        this._contactList = JSON.parse(stringifiedContacts);
    }
    return this.contactList$.next(this._contactList);
  }

  addContact(contact: Omit<ContactEntity, 'id'>) {
    const newContact: ContactEntity = this._attachIdToContact(contact);
    this._contactList.push(newContact);
    this.contactList$.next(this._contactList);
    const stringifiedContacts: string = JSON.stringify(this._contactList);
    localStorage.setItem(this.localStorageKey, stringifiedContacts);
  }

  private _attachIdToContact(
    contact: Omit<ContactEntity, 'id'>
  ): ContactEntity {
    const newContact: ContactEntity = {
      ...contact,
      id: Math.floor(Math.random() * 10000).toFixed(),
    };
    return newContact;
  }
}
