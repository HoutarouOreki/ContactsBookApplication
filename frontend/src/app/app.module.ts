import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ListOfContactsComponent } from './components/contact/list-of-contacts/list-of-contacts.component';
import { ShowContactComponent } from './components/contact/show-contact/show-contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactService } from './services/contact.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
