import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  readonly today = new Date();

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  birthdayFormControl = new FormControl('', [Validators.required]);
  pictureUrlFormControl = new FormControl('', []);

  newContactFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    birthday: this.birthdayFormControl,
    pictureUrl: this.pictureUrlFormControl,
  });

  constructor(
    private _contactBookService: ContactBookService,
    private route: Router
  ) {}

  submitNewContact() {
    const newContact: Omit<ContactEntity, 'id'> = {
      firstName: this.newContactFormGroup.value.firstName,
      lastName: this.newContactFormGroup.value.lastName,
      birthday: this.newContactFormGroup.value.birthday,
      pictureUrl: this.newContactFormGroup.value.pictureUrl,
    };
    this._contactBookService.addContact(newContact);
    this.newContactFormGroup.reset();
  }

  navigateToDashboardView() {
    this.route.navigateByUrl('dashboard');
  }
}
