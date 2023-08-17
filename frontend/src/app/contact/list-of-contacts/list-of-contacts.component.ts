import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-list-of-contacts',
  templateUrl: './list-of-contacts.component.html',
  styleUrls: ['./list-of-contacts.component.css']
})
export class ListOfContactsComponent implements OnInit {

  contactsList: Contact[] = [];
  filteredContactsList: Contact[] = [];
  paginatedContactsList: Contact[] = [];
  page: number = 1;
  pageSize = 10;
  h = 0;

  constructor(private service: ContactService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getContacts().subscribe(data => {
      this.contactsList = data;
      this.refreshVisualLists("");
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
}

