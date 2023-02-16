// Importing necessary modules and interfaces
import { Consultor } from './../interfaces/prefilled.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Defining HTTP options to be used in the requests
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PrefilledService {
  // Defining the API endpoint for the consultor resource
  private apiURL ='http://localhost:3000/consultor';
  constructor(private http: HttpClient) { }

  // Method to retrieve all the consultors from the API
  getConsultors():Observable<Consultor[]>{
    return this.http.get<Consultor[]>(this.apiURL)
  }

  // Method to update a consultor in the API
  putConsultor(consultor: Consultor):Observable<Consultor[]>{
    // Defining the API endpoint to update the specific consultor
    const apiURLput = `${this.apiURL}/${consultor.id}`
    // Making a PUT request to the API to update the consultor
    return this.http.put<Consultor[]>(apiURLput, consultor, httpOptions);
  }
}
