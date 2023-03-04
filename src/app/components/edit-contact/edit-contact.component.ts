import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit, OnChanges {
  @Input() contactToEdit: ContactEntity | null = null;
  readonly today = new Date();
  readonly urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  birthdayFormControl = new FormControl('', [Validators.required]);
  pictureUrlFormControl = new FormControl('', [
    Validators.pattern(this.urlRegex),
  ]);

  newContactFormGroup = new FormGroup({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    birthday: this.birthdayFormControl,
    pictureUrl: this.pictureUrlFormControl,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactToEdit']) {
      if (this.contactToEdit !== null) {
        this.firstNameFormControl.setValue(this.contactToEdit.firstName);
        this.lastNameFormControl.setValue(this.contactToEdit.lastName);
        this.birthdayFormControl.setValue(this.contactToEdit.birthday);
        this.pictureUrlFormControl.setValue(this.contactToEdit.pictureUrl);
      }
    }
  }

  constructor(
    private _contactBookService: ContactBookService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submitContact() {
    const newContact: Omit<ContactEntity, 'id'> = {
      firstName: this.newContactFormGroup.value.firstName,
      lastName: this.newContactFormGroup.value.lastName,
      birthday: this.newContactFormGroup.value.birthday,
      pictureUrl: this.newContactFormGroup.value.pictureUrl,
    };
    if (this.contactToEdit === null)
      this._contactBookService.addContact(newContact);
    else
      this._contactBookService.updateContactDetails(
        this.contactToEdit.id,
        newContact
      );
    this.newContactFormGroup.reset();
    this.route.navigateByUrl('dashboard');
  }
}
