import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfContactsComponent } from './contact/list-of-contacts/list-of-contacts.component';
import { ShowContactComponent } from './contact/show-contact/show-contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactService } from './contact.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ShowContactComponent,
    ListOfContactsComponent,
    ShowContactComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
