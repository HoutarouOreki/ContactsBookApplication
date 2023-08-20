import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @ViewChild('ngbAlertComponent', { static: false }) ngbAlert!: NgbAlert;
  alert?: Alert;
  timeout?: any;

  show(alert: Alert) {
    this.alert = alert;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.ngbAlert.close(), 5000);
  }
}
