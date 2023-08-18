import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent {
  @Input({ required: true }) contact!: Contact
  @Output() onEditButton = new EventEmitter();
}
