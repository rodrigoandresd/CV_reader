import { RestService } from '../rest.service'; // Import RestService module
import { Component } from '@angular/core'; // Import Component module
import { Router } from '@angular/router'; // Import Router module



@Component({
  selector: 'app-upload', // Selector for the component
  templateUrl: './upload.component.html', // Template for the component
  styleUrls: ['./upload.component.scss'] // Styles for the component
})
export class UploadComponent{

  private fileTmp:any; // Declare private variable 'fileTmp'

  constructor(private restService: RestService, private router: Router){ //TODO estoy inyect

  }

  getFile($event: any): void {
    // Function to handle the file input change event
    const [ file ] = $event.target.files;
    // Extract the selected file
    if (file.type !== 'application/pdf') {
      // If the selected file is not of type PDF, show an error message and return
      alert('Please, select a PDF file.');
      return;
    }
    // If the selected file is of type PDF, store it in a temporary variable for multer
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFile():void{
    // Function to send the selected file to the server
    // Create a new FormData object
    const body = new FormData();
    // Append the file to the FormData object
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);


    // Call the sendPost method of the RestService to send the file to the server
    this.restService.sendPost(body)
    .subscribe(res => console.log(res))

    // Redirect to the form page after successful file upload
    this.restService.sendPost(body)
    this.router.navigate(['/form']).then(() => {
      window.location.reload();
    });
  }
}
