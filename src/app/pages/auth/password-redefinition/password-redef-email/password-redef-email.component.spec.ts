import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRedefEmailComponent } from './password-redef-email.component';

describe('PasswordRedefEmailComponent', () => {
  let component: PasswordRedefEmailComponent;
  let fixture: ComponentFixture<PasswordRedefEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRedefEmailComponent]
    });
    fixture = TestBed.createComponent(PasswordRedefEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
