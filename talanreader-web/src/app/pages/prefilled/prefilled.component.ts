import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrefilledService } from './services/prefilled.service';
import { tap } from 'rxjs/operators';
import { Consultor } from './interfaces/prefilled.interface';
import * as jsPDF from 'jspdf';

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
    this.consultorSvc
      .putConsultor(consultor)
      .subscribe(() => {this.consultors = this.consultors.filter(c => c.id != consultor.id)});
      this.saveToJsonClick.emit(consultor);
  }

  saveName(event: Event): void {
    const name = event.target as HTMLInputElement;
    this.consultors[0].consultorName = name.value;
  }
  saveEmail(event: Event): void {
    const email = event.target as HTMLInputElement;
    this.consultors[0].consultorEmail = email.value;
  }
  savePhone(event: Event): void {
    const phone = event.target as HTMLInputElement;
    this.consultors[0].consultorPhone = phone.value;
  }
  saveAcademic(event: Event): void {
    const academic = event.target as HTMLInputElement;
    this.consultors[0].consultorAcademic = academic.value;
  }
  saveWork(event: Event): void {
    const work = event.target as HTMLInputElement;
    this.consultors[0].consultorWork = work.value;
  }
  saveSkills(event: Event): void {
    const skills = event.target as HTMLInputElement;
    this.consultors[0].consultorSkills = skills.value;
  }

  downloadPDF() {
    if (this.consultors && this.consultors.length > 0) {
      const consultor = this.consultors[0];
      const doc = new jsPDF.jsPDF();

      doc.setFont("times");
      doc.setFont("helvetica");
      doc.setFontSize(16);
      doc.text(`Hoja de vida de ${consultor.consultorName}`, 10, 10);
      doc.setFontSize(12);
      doc.text(`Nombre: ${consultor.consultorName}`, 10, 20);
      doc.text(`Email: ${consultor.consultorEmail}`, 10, 30);
      doc.text(`Teléfono: ${consultor.consultorPhone}`, 10, 40);
      doc.text(`Formación Académica: ${consultor.consultorAcademic}`, 10, 50);
      doc.text(`Experiencia Laboral: ${consultor.consultorWork}`, 10, 60);
      doc.text(`Habilidades: ${consultor.consultorSkills}`, 10, 70);

      doc.save(`Hoja de vida de ${consultor.consultorName}.pdf`);
    } else {
      console.error('No hay consultores disponibles para descargar en PDF.');
    }
  }

}

