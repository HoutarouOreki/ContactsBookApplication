import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactComponent as ShowContactComponent } from './show-contact.component';

describe('ContactComponent', () => {
  let component: ShowContactComponent;
  let fixture: ComponentFixture<ShowContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowContactComponent]
    });
    fixture = TestBed.createComponent(ShowContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
