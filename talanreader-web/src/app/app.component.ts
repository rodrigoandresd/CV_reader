import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Talanreader-Web';
}

export class RestService {
  constructor(private http:HttpClient){

  }
  sendPost():Observable<any>{
    return this.http.post('http://localhost:3000/api/consultor/upload', body)
  }
}
