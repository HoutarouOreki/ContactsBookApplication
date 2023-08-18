import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  formTitle = "";
  editedContact: Contact | undefined;

  contactsLoaded = false;
  contactsList: Contact[] = [];
  filteredContactsList: Contact[] = [];
  paginatedContactsList: Contact[] = [];
  page: number = 1;
  pageSize = 10;
  h = 0;

  constructor(private service: ContactService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getContacts().subscribe(data => {
      this.contactsList = data;
      this.refreshVisualLists("");
      this.contactsLoaded = true;
    })
  }

  refreshVisualLists(email: string) {
    if (!email) {
      this.filteredContactsList = this.contactsList;
      this.updatePaginatedList();
      return;
    }

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
    this.alertMessage = message;
    this.alertClosed = false;
    setTimeout(() => this.alertClosed = true, 5000);
  }
}

