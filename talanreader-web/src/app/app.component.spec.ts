import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Configure and compile the test bed module
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule // Import the RouterTestingModule to provide a router context for testing
      ],
      declarations: [
        AppComponent // Declare the AppComponent as the component to be tested
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Create an instance of the AppComponent to be tested
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // Ensure that the component is created and exists
  });

  it(`should have as title 'talanreader-web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('talanreader-web'); // Ensure that the component has the correct title property value
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection to update the view with the component's properties
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('talanreader-web app is running!');
  });
});
