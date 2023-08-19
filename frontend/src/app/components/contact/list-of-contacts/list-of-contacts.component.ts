import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observer } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-list-of-contacts',
  templateUrl: './list-of-contacts.component.html',
  styleUrls: ['./list-of-contacts.component.css']
})
export class ListOfContactsComponent implements OnInit {
  @ViewChild('alert', { static: false }) alert!: NgbAlert;
  alertClosed = true;
  alertMessage = "";
  alertType = AlertTypes.default;

  filterControl = new FormControl("");

  formTitle = "";
  editedContact: Contact | undefined;

  state = States.loading;
  States = States;

  contactsList: Contact[] = [];
  filteredContactsList: Contact[] = [];
  paginatedContactsList: Contact[] = [];
  page: number = 1;
  pageSize = 10;

  constructor(private service: ContactService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getContacts().subscribe({
      next: (data: Contact[]) => this.setContacts(data),
      error: (err: HttpErrorResponse) => this.handleLoadingError(err),
    });
  }

  handleLoadingError(err: HttpErrorResponse) {
    this.state = States.error;
    this.showAlert(err.status + " " + err.statusText, AlertTypes.error);
  }

  setContacts(contacts: Contact[]) {
    this.contactsList = contacts;
    this.refreshVisualLists();
    this.state = States.loaded;
  }

  refreshVisualLists() {

    var email = this.filterControl.value?.trim() ?? "";

    this.filteredContactsList = this.contactsList.filter(contact =>
      contact.email.toLowerCase().includes(email.toLowerCase())
    );

    this.updatePaginatedList();
  }

  updatePaginatedList() {
    var start = (this.page - 1) * this.pageSize;
    var end = start + this.pageSize;

    this.paginatedContactsList = this.filteredContactsList.slice(start, end);
  }

  onCreateContactButton(content: any) {
    this.formTitle = "Create a Contact";
    this.editedContact = undefined;
    this.modalService.open(content);
  }

  onEditContactButton(content: any, contact: Contact) {
    this.formTitle = "Update contact";
    this.editedContact = contact;
    this.modalService.open(content);
  }

  onRemoveContactButton(contact: Contact) {
    this.service.deleteContact(contact.id).subscribe({
      complete: () => this.showMessageAndRefresh("Removed " + contact.firstName + " " + contact.lastName),
      error: () => {
        this.alertMessage = "Removing contact failed";
        this.alertClosed = false;
        setTimeout(() => this.alertClosed = true, 5000);
      }
    });
  }

  showMessageAndRefresh(message: string) {
    this.refreshList();
    this.showAlert(message);
  }

  private showAlert(message: string, alertType?: AlertTypes) {
    this.alertMessage = message;
    this.alertClosed = false;
    this.alertType = alertType ?? AlertTypes.default;
    setTimeout(() => this.alertClosed = true, 5000);
  }
}

const enum AlertTypes {
  default = "primary",
  success = "success",
  warning = "warning",
  error = "danger",
}

enum States {
  loading,
  loaded,
  error,
}
