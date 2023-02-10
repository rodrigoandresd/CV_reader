import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrefilledService } from './services/prefilled.service';
import { tap } from 'rxjs/operators';
import { Consultor } from './interfaces/prefilled.interface';
import { outputAst } from '@angular/compiler';
// import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-prefilled',
  templateUrl: './prefilled.component.html',
  styleUrls: ['./prefilled.component.scss']
})
export class PrefilledComponent implements OnInit {
  consultors!: Consultor[];
  @Output() saveToJsonClick = new EventEmitter<Consultor>();
  constructor(private consultorSvc: PrefilledService) { }


  ngOnInit(): void {
    this.consultorSvc.getConsultors()
      .pipe(
        // tap(res => console.log(res))
        tap((consultors: Consultor[]) => {
          this.consultors = consultors
          return consultors;
        })
      )
      .subscribe();
  }
  onClick(consultor: Consultor): void {
    console.log('Click', consultor);
    //this.saveToJsonClick.emit(consultor);
    this.consultorSvc.postConsultor(consultor).subscribe(data => {
      console.log(data);
    });
  //   const data = JSON.stringify(this.consultors);
  //   const blob = new Blob([data], {type: 'application/json'});
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = './consultors.json';
  //   link.click();
  }

  saveName(event: Event): void {
    const name = event.target as HTMLInputElement;
    this.consultors[0].consultorName = name.value;
  }
}
  // consultors: Consultor[] = consultorData;

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

