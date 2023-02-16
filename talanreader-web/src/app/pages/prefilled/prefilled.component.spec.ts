import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefilledComponent } from './prefilled.component';

describe('PrefilledComponent', () => {
  let component: PrefilledComponent;
  let fixture: ComponentFixture<PrefilledComponent>;

  beforeEach(async () => {
    // Before each test, configure TestBed with the necessary components and modules
    await TestBed.configureTestingModule({
      declarations: [ PrefilledComponent ]
    })
    .compileComponents();

    // Create a ComponentFixture for the PrefilledComponent
    fixture = TestBed.createComponent(PrefilledComponent);
    // Retrieve the PrefilledComponent instance from the fixture
    component = fixture.componentInstance;
    // Trigger change detection for the component
    fixture.detectChanges();
  });
  // Test that the component was created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
