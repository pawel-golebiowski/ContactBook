import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactEntity } from 'src/app/models/contactEntity';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contactDetails: ContactEntity | null = null;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ contact }) => {
      this.contactDetails = contact;
    });
  }
}
