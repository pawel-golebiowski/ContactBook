import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/models/contactEntity';
import { ContactBookService } from 'src/app/services/contact-book.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<ContactEntity>([]);

  readonly displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthday',
    'pictureUrl',
    'actions',
  ];

  constructor(
    private _contactBookService: ContactBookService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._contactBookService.contactList$.subscribe(
      (contacts: ContactEntity[]) => {
        this.dataSource.data = contacts;
      }
    );
  }

  navigateToContactDetails(id: string) {
    this.route.navigateByUrl('detail/' + id);
  }

  confirmToDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Contact',
        content: 'Are you sure to delete this contact?  ',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._contactBookService.deleteContact(id);
      }
    });
  }
}
