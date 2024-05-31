import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSnapshotModalComponent } from './save-snapshot-modal.component';

describe('SaveSnapshotModalComponent', () => {
  let component: SaveSnapshotModalComponent;
  let fixture: ComponentFixture<SaveSnapshotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSnapshotModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSnapshotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
