import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfContactsComponent } from './list-of-contacts.component';

describe('ListOfContactsComponent', () => {
  let component: ListOfContactsComponent;
  let fixture: ComponentFixture<ListOfContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfContactsComponent]
    });
    fixture = TestBed.createComponent(ListOfContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
