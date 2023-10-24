import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGeneroComponent } from './select-genero.component';

describe('SelectGeneroComponent', () => {
  let component: SelectGeneroComponent;
  let fixture: ComponentFixture<SelectGeneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGeneroComponent]
    });
    fixture = TestBed.createComponent(SelectGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
