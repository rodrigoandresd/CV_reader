import { Consultor } from './../interfaces/prefilled.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefilledService {
  private apiURL ='http://localhost:3000/consultor';
  constructor(private http: HttpClient) { }

  getConsultors():Observable<Consultor[]>{
    return this.http.get<Consultor[]>(this.apiURL)
  }
}
