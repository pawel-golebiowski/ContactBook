import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ContactEntity>([]);
  contactListRef: ContactEntity[] = [];

  firstNameFilterFormControl = new FormControl('', []);
  lastNameFilterFormControl = new FormControl('', []);
  filterFormGroup: FormGroup;

  subscribtion = new Subscription();
  firstContactsArrival = true;

  readonly displayedColumns: string[] = [
    'pictureUrl',
    'firstName',
    'lastName',
    'birthday',
    'actions',
  ];

  constructor(
    private _contactBookService: ContactBookService,
    private fb: FormBuilder,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.filterFormGroup = this.fb.group({
      firstNameFilter: this.firstNameFilterFormControl,
      lastNameFilter: this.lastNameFilterFormControl,
    });
  }

  ngOnInit(): void {
    this.initFilterFormGroup();
    this.subscribtion.add(
      this._contactBookService.contactList$.subscribe(
        (contacts: ContactEntity[]) => {
          this.contactListRef = contacts;
          if (this.firstContactsArrival) {
            this.dataSource.data = this.contactListRef;
            this.firstContactsArrival = false;
          } else this._filterContacts();
        }
      )
    );
  }

  navigateToContactDetails(id: string) {
    this.route.navigateByUrl('detail/' + id);
  }

  navigateToNewContactView() {
    this.route.navigateByUrl('add-contact');
  }

  confirmToDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Contact',
        content: 'Are you sure to delete this contact?  ',
      },
    });

    this.subscribtion.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._contactBookService.deleteContact(id);
        }
      })
    );
  }

  initFilterFormGroup() {
    this.subscribtion.add(
      this.filterFormGroup.valueChanges.subscribe(() => this._filterContacts())
    );
  }

  private _filterContacts() {
    this.dataSource.data = this.contactListRef
      .filter((contact) =>
        contact.firstName.includes(this.firstNameFilterFormControl.value)
      )
      .filter((contact) =>
        contact.lastName.includes(this.lastNameFilterFormControl.value)
      );
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
