import { HttpClientModule } from '@angular/common/http';  '@angular/common/http';  // Importing the HttpClientModule to use HttpClient in the application
import { NgModule } from '@angular/core';  // Importing NgModule decorator to create an Angular module
import { FormsModule } from '@angular/forms';  // Importing FormsModule to use Angular's two-way data binding
import { BrowserModule } from '@angular/platform-browser';  // Importing BrowserModule which provides essential services for web app

import { AppRoutingModule } from './app-routing.module'; // Importing AppRoutingModule for routing
import { AppComponent } from './app.component'; // Importing the root component of the application
import { PrefilledComponent } from './pages/prefilled/prefilled.component'; // Importing the PrefilledComponent
import { UploadComponent } from './upload/upload.component'; // Importing the UploadComponent

@NgModule({
  declarations: [
    AppComponent, // Declaring the root component of the application
    PrefilledComponent, // Declaring the PrefilledComponent
    UploadComponent // Declaring the UploadComponent
  ],
  imports: [
    BrowserModule,  // Importing the BrowserModule which provides essential services for web app
    AppRoutingModule,  // Importing AppRoutingModule for routing
    FormsModule, // Importing FormsModule to use Angular's two-way data binding
    HttpClientModule // Importing the HttpClientModule to use HttpClient in the application
  ],
  providers: [], // Providing services, dependencies, and values that the components in the application require
  bootstrap: [AppComponent]  // Identifying the root component that Angular should bootstrap when it starts the application
})
export class AppModule { } // Exporting the AppModule class so that it can be imported in other modules or components
