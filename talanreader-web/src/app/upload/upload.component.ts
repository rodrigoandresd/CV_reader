import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private fileTmp:any;

  constructor(private restService: RestService) {

   }

  ngOnInit(): void {
  }

  getFile($event:any): void {
    console.log($event)
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFile(): void {

    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName)

    this.restService.sendPost(body)
    .subscribe(res => console.log(res))
  }
}
