import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgVersionFormComponent } from './add-org-version-form.component';

describe('AddOrgVersionFormComponent', () => {
  let component: AddOrgVersionFormComponent;
  let fixture: ComponentFixture<AddOrgVersionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrgVersionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrgVersionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
