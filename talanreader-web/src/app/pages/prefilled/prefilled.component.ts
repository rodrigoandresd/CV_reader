import { Component, OnInit } from '@angular/core';
import consultorData from '../../demo.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Consultor {
  consultorEmail: String,
  consultorPhone: String,
  consultorName: String,
  consultorAcademic: String,
  consultorWorkExperience: String,
}

@Component({
  selector: 'app-prefilled',
  templateUrl: './prefilled.component.html',
  styleUrls: ['./prefilled.component.scss']
})
export class PrefilledComponent implements OnInit {
  formTitle = 'email: example@mail.com'
  constructor() { }
  consultors: Consultor[] = consultorData;

  ngOnInit(): void {

  }

//   editarForm = new FormGroup({
//     name: new FormControl(''),
//     email: new FormControl(''),
//     phone: new FormControl(''),
//     skills: new FormControl(''),
//     education: new FormControl(''),
//     experience: new FormControl('')
//   })

//   ngOnInit(): void {
//     let consultor = this.activerouter.snapshot.paramMap.get('id');
//     let token = this.getToken();

// this.api.getSinglePacient(paciteid).subscribe(data => {

// this.datosPaciente = data[0];

// this.editarForm.setValue({
//   'nombre': this.datosPaciente.Nombre,
//   'correo': this.datosPaciente.Correo,
//   'dni': this.datosPaciente.DNI,
//   'direccion': this.datosPaciente.Direccion,
//   'codigostal': this.datosPaciente.CodigoPostal,
//   'genero': this.datosPaciente.Genero,
//   'telefono': this.datosPaciente.Telefono,
//   'pacienteId': this.datosPaciente.PacienteId,
//   'fechaNacimiento': this.datosPaciente.FechaNacimiento
}
