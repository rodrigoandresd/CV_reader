import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // defines the name of the custom HTML element, used to represent the component
  templateUrl: './app.component.html', // specifies the component's template file
  styleUrls: ['./app.component.scss']  // specifies the component's style files
})
export class AppComponent {
  title = 'Talanreader-Web'; // defines a class property called 'title' with an initial value of 'Talanreader-Web'
}
