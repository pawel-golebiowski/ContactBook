import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ContactEntity } from '../models/contactEntity';
import { ContactBookService } from './contact-book.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolverService implements Resolve<ContactEntity> {
  constructor(private _contactBookService: ContactBookService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ContactEntity> | Promise<ContactEntity> | ContactEntity {
    return this._contactBookService.getContactDetails(route.paramMap.get('id'));
  }
}
