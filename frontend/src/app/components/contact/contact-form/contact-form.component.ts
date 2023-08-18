import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input({ required: true }) modal!: NgbModalWindow;
  @Input() editedContact: Contact | undefined;
  @Output() newContactEvent = new EventEmitter<string>();

  contactForm = new FormGroup({
    id: new FormControl<number>(0),
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", [Validators.pattern(/^\d{9}$/)]),
    address: new FormControl(""),
    city: new FormControl(""),
    zipCode: new FormControl(""),
  });

  sending = false;
  errors: string[] | undefined;

  constructor(private contactService: ContactService) {
  }
  ngOnInit(): void {
    if (!this.editedContact) {
      return;
    }

    this.contactForm.setValue(this.editedContact);
  }

  onSubmit() {
    this.sending = true;
    var contact = this.contactForm.value;

    const observer = {
      next: (contact: Contact) => this.handleResponse(contact),
      error: (errorResponse: HttpErrorResponse) => this.handleError(errorResponse),
    };

    if (this.editedContact) {
      this.contactService.editContact(contact as Contact).subscribe(observer);
    } else {
      this.contactService.addContact(contact as Contact).subscribe(observer);
    }
  }

  handleResponse(contact: Contact) {
    this.sending = false;
    console.log(contact);
    this.newContactEvent.emit((contact.firstName + " " + contact.lastName) +
      (this.editedContact ? " updated" : " added"));
    this.modal.dismiss("complete");
  }

  handleError(error: HttpErrorResponse) {
    this.sending = false;
    if (error.error.length) {
      this.errors = error.error;
    } else {
      this.errors = [error.message];
    }
  }
}
