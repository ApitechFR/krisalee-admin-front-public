import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchAllDialogComponent } from './launch-all-dialog.component';

describe('LaunchAllDialogComponent', () => {
  let component: LaunchAllDialogComponent;
  let fixture: ComponentFixture<LaunchAllDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchAllDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchAllDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
