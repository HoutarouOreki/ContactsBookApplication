import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  addContact(contact: Contact): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Contact>(this.url, contact, httpOptions);
  }

  editContact(contact: Contact): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Contact>(this.url, contact, httpOptions);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<Contact>(this.url + '/' + id);
  }
}
