import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ContactEntity } from '../models/contactEntity';

@Injectable({
  providedIn: 'root',
})
export class ContactBookService {
  private _contactList: ContactEntity[] = [];
  private readonly localStorageKey = 'contacts';

  contactList$ = new BehaviorSubject<ContactEntity[]>([]);

  constructor(private _snackBar: MatSnackBar) {}

  getContacts() {
    if (this._contactList.length === 0) {
      const stringifiedContacts = localStorage.getItem(this.localStorageKey);
      if (stringifiedContacts !== null)
        this._contactList = JSON.parse(stringifiedContacts);
    }
    return this.contactList$.next(this._contactList);
  }

  getContactDetails(id: string | null): ContactEntity {
    const contact = this._contactList.find((contact) => {
      if (contact.id === id) return true;
      else return false;
    });
    if (contact) return contact;
    else
      return {
        firstName: 'NotFound',
        lastName: 'NotFound',
        birthday: new Date(),
        pictureUrl: '',
        id: 'NotFound',
      };
  }

  addContact(contact: Omit<ContactEntity, 'id'>) {
    const newContact: ContactEntity = {
      ...contact,
      id: Math.floor(Math.random() * 10000).toFixed(),
    };
    this._contactList.push(newContact);
    this._openSnackBar('Contact added successfully');
    this._saveContactList();
  }

  deleteContact(id: string) {
    const idx: number = this._contactList.findIndex((contact) => {
      if (contact.id === id) return true;
      else return false;
    });
    if (idx > -1) {
      this._contactList.splice(idx, 1);
      this._openSnackBar('Contact deleted successfully');
    }

    this._saveContactList();
  }

  updateContactDetails(id: string, contact: Omit<ContactEntity, 'id'>) {
    const idx: number = this._contactList.findIndex((contact) => {
      if (contact.id === id) return true;
      else return false;
    });
    if (idx > -1) {
      this._contactList[idx] = { ...contact, id: id };
      this._openSnackBar('Contact updated successfully');
    }
    this._saveContactList();
  }

  private _saveContactList() {
    this.contactList$.next(this._contactList);
    const stringifiedContacts: string = JSON.stringify(this._contactList);
    localStorage.setItem(this.localStorageKey, stringifiedContacts);
  }

  private _openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 2000 });
  }
}
