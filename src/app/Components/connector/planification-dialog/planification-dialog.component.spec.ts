import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationDialogComponent } from './planification-dialog.component';

describe('PlanificationDialogComponent', () => {
  let component: PlanificationDialogComponent;
  let fixture: ComponentFixture<PlanificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
