import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganizationFormComponent } from './update-organization-form.component';

describe('UpdateOrganizationFormComponent', () => {
  let component: UpdateOrganizationFormComponent;
  let fixture: ComponentFixture<UpdateOrganizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrganizationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
