// Importing the necessary modules for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importing the component that needs to be tested
import { UploadComponent } from './upload.component';
// The main test suite that describes the component
describe('UploadComponent', () => {
  // Creating variables to store the instance of the component and the test fixture
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  // Setting up the test environment before each test case
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ]
    })
    .compileComponents();
    // Creating a test fixture and component instance
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Actual test case that checks if the component is created or not
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
