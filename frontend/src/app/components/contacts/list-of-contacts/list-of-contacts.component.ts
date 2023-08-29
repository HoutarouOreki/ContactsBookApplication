import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Alert, AlertTypes } from 'src/app/models/alert';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactsResponse } from 'src/app/models/contactsReponse';

@Component({
  selector: 'app-list-of-contacts',
  templateUrl: './list-of-contacts.component.html',
  styleUrls: ['./list-of-contacts.component.css']
})
export class ListOfContactsComponent implements OnInit {
  filterControl = new FormControl("");

  state = States.loading;
  States = States;

  contacts: Contact[] = [];
  totalMatchingFilter?: number;

  page: number = 1;
  pageSize = 10;

  @Output() alert = new EventEmitter<Alert>();
  @Input({ required: true }) contactFormComponent!: ContactFormComponent;

  constructor(private service: ContactService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.state = States.loading;
    var email = this.filterControl.value?.trim() ?? "";
    this.service.getContactsFilteredPaginated(email, this.page, this.pageSize).subscribe({
      next: (data: ContactsResponse) => this.setContacts(data),
      error: (err: HttpErrorResponse) => this.handleLoadingError(err),
    });
  }

  handleLoadingError(err: HttpErrorResponse) {
    this.state = States.error;
    this.alert.emit({ message: err.status + " " + err.statusText, type: AlertTypes.error });
  }

  setContacts(contactsResponse: ContactsResponse) {
    this.contacts = contactsResponse.data;
    this.totalMatchingFilter = contactsResponse.totalMatchingFilter;
    this.state = States.loaded;
  }

  onEditContactButton(contact: Contact) {
    this.contactFormComponent.openToEdit(contact);
  }

  onRemoveContactButton(contact: Contact) {
    this.service.deleteContact(contact.id).subscribe({
      complete: () => {
        this.alert.emit({ message: "Removed " + contact.firstName + " " + contact.lastName, type: AlertTypes.success });
        this.refreshList();
      },
      error: () => this.alert.emit({ message: "Removing contact failed", type: AlertTypes.error }),
    });
  }
}

enum States {
  loading,
  loaded,
  error,
}
