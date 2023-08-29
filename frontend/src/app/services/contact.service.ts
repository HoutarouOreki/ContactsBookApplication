import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from 'src/environments/environment';
import { ContactsResponse } from '../models/contactsReponse';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getContactsFilteredPaginated(filter: string, pageNumber: number, pageSize: number): Observable<ContactsResponse> {
    return this.http.get<ContactsResponse>(this.url, {
      params: new HttpParams()
        .set("filter", filter)
        .set("pageNumber", pageNumber)
        .set("pageSize", pageSize)
    });
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
