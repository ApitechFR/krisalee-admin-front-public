import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponentComponent } from './management-component.component';

describe('ManagementComponentComponent', () => {
  let component: ManagementComponentComponent;
  let fixture: ComponentFixture<ManagementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
