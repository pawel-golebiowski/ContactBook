import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() contactToEdit: ContactEntity | null = null;
  readonly urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  readonly today = new Date();

  subscription = new Subscription();
  isModified = false;

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(127),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(127),
  ]);
  birthdayFormControl = new FormControl('', [Validators.required]);
  pictureUrlFormControl = new FormControl('', [
    Validators.pattern(this.urlRegex),
  ]);

  newContactFormGroup: FormGroup;

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
    private fb: FormBuilder,
    private route: Router
  ) {
    this.newContactFormGroup = this.fb.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      birthday: this.birthdayFormControl,
      pictureUrl: this.pictureUrlFormControl,
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.newContactFormGroup.valueChanges.subscribe(
        () => (this.isModified = true)
      )
    );
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
