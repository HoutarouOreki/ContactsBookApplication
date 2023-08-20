import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Alert, AlertTypes } from 'src/app/models/alert';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  @ViewChild('content', { static: false }) modal!: NgbModalWindow;
  @Input() editedContact: Contact | undefined;
  @Output() alert = new EventEmitter<Alert>();
  @Output() contactsUpdated = new EventEmitter();

  title: String = "";

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
    zipCode: new FormControl("", [Validators.pattern(/^\d\d\-\d\d\d$/)]),
  });

  sending = false;
  errors: string[] | undefined;

  constructor(private contactService: ContactService, private modalService: NgbModal) {
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
      console.log(contact);
      this.contactService.addContact(contact as Contact).subscribe(observer);
    }
  }

  private handleResponse(contact: Contact) {
    this.sending = false;
    this.errors = undefined;
    this.alert.emit({
      message: (contact.firstName + " " + contact.lastName) +
        (this.editedContact ? " updated" : " added"),
      type: AlertTypes.success
    });
    this.contactsUpdated.emit();
    this.modalService.dismissAll();
  }

  private handleError(error: HttpErrorResponse) {
    this.sending = false;
    if (error.error.length) {
      this.errors = error.error;
    } else {
      this.errors = [error.message];
    }
  }

  openToCreate() {
    this.errors = undefined;
    this.title = "Create a Contact";
    this.editedContact = undefined;
    this.resetForm();
    this.modalService.open(this.modal);
  }

  openToEdit(contact: Contact) {
    this.errors = undefined;
    this.title = "Update contact";
    this.resetForm();
    this.editedContact = contact;
    this.contactForm.setValue(this.editedContact);
    this.modalService.open(this.modal);
  }

  // this method is necessary instead of form.reset()
  // because the latter sets fields to `null`
  resetForm() {
    this.contactForm.reset();
    this.contactForm.setValue({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      zipCode: "",
    })
  }
}
