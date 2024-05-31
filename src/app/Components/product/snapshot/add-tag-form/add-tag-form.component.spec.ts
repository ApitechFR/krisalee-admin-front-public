import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTAgFormComponent } from './add-tag-form.component';

describe('AddTAgFormComponent', () => {
  let component: AddTAgFormComponent;
  let fixture: ComponentFixture<AddTAgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTAgFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTAgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
