import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutingRequestComponent } from './executing-request.component';

describe('ExecutingRequestComponent', () => {
  let component: ExecutingRequestComponent;
  let fixture: ComponentFixture<ExecutingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutingRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
