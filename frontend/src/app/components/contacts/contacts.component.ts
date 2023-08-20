import { Component, ViewChild } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  @ViewChild('form', { static: false }) form!: ContactFormComponent;

  onCreateContactButton() {
    this.form.openToCreate();
  }
}

