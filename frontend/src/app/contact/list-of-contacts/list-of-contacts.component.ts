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

  constructor(private service: ContactService) { }

  ngOnInit(): void {
    console.log("h");
    this.refreshList();
  }

  refreshList() {
    this.service.getContacts().subscribe(data => {
      this.contactsList = data;
      this.refreshFilteredList("");
    })
  }

  refreshFilteredList(email: string) {
    if (!email) {
      this.filteredContactsList = this.contactsList;
    }

    this.filteredContactsList = this.contactsList.filter(contact =>
      contact.email.toLowerCase().includes(email.toLowerCase())
    );
  }
}

