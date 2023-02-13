import { RestService } from '../rest.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent{

  private fileTmp:any;

  constructor(private restService: RestService, private router: Router){ //TODO estoy inyect

  }

  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFile():void{

    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('email','test@test.com')

    this.restService.sendPost(body)
    .subscribe(res => console.log(res))
    this.restService.sendPost(body)
    this.router.navigate(['/form']);
  }
}
