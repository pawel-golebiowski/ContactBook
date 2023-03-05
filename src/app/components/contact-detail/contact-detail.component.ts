import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactEntity } from 'src/app/models/contactEntity';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  contactDetails: ContactEntity | null = null;
  subscription = new Subscription();

  constructor(private _activatedRoute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this._activatedRoute.data.subscribe(({ contact }) => {
        this.contactDetails = contact;
      })
    );
  }

  navigateToDashboardView() {
    this.route.navigateByUrl('dashboard');
  }

  cancelChanges() {
    if (this.contactDetails) this.contactDetails = { ...this.contactDetails };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
