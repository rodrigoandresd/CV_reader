import { NgModule } from '@angular/core'; // Import NgModule decorator from Angular core
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes from Angular router module
import { PrefilledComponent } from './pages/prefilled/prefilled.component'; // Import the Prefil
import { UploadComponent } from './upload/upload.component'; // Import the UploadComponent from upload folder

const routes: Routes = [ // Define the routes using the Routes interface
  { path: 'form', component: PrefilledComponent }, // Define a route with path 'form' and PrefilledComponent as its component
  { path: 'upload', component: UploadComponent } // Define a route with path 'upload' and UploadComponent as its component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import the router module and configure it with the defined routes
  exports: [RouterModule] // Export the configured router module
})
export class AppRoutingModule { } // Export the AppRoutingModule module
