import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent {
  @Input({ required: true }) contact!: Contact
  @Output() onEditButton = new EventEmitter();
  @Output() onRemoveButton = new EventEmitter();

  getFormattedAddress(contact: Contact): string {
    var cityZipCode = [contact.city, contact.zipCode]
      .filter(x => x != undefined && x.length > 0)
      .join(' ');
    var fullAddress = [contact.address, cityZipCode]
      .filter(x => x != undefined && x.length > 0)
      .join(', ');
    return fullAddress;
  }
}
