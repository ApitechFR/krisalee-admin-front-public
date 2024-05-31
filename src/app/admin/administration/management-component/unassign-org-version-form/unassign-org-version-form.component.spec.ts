import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignOrgVersionFormComponent } from './unassign-org-version-form.component';

describe('UnassignOrgVersionFormComponent', () => {
  let component: UnassignOrgVersionFormComponent;
  let fixture: ComponentFixture<UnassignOrgVersionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignOrgVersionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignOrgVersionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
