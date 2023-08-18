import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input({ required: true }) contact!: Contact
  @Output() onEditButton = new EventEmitter();
}
