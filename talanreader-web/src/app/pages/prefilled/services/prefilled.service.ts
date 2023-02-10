import { Consultor } from './../interfaces/prefilled.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PrefilledService {
  private apiURL ='http://localhost:3000/consultor';
  constructor(private http: HttpClient) { }

  getConsultors():Observable<Consultor[]>{
    return this.http.get<Consultor[]>(this.apiURL)
  }

  postConsultor(consultor: Consultor):Observable<Consultor[]>{
    const url = '${this.apiURL}/${consultor.id}';
    return this.http.put<Consultor[]>(url, consultor, httpOptions);
  }

}
