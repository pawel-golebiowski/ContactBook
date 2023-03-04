import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'detail/:id',
    component: ContactDetailComponent,
    resolve: { contact: ContactResolverService },
  },
  { path: 'add-contact', component: AddContactComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
