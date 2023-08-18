import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfContactsComponent } from './contact/list-of-contacts/list-of-contacts.component';

const routes: Routes = [
  { path: 'contacts', component: ListOfContactsComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
