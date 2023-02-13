import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrefilledService } from './services/prefilled.service';
import { tap } from 'rxjs/operators';
import { Consultor } from './interfaces/prefilled.interface';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
      window.location.reload();
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
      const imgData = '../assets/img/talan_logo.png';
      doc.addImage(imgData, 'PNG', 80, 10, 40, 20);
      autoTable(doc, {
        startY: 40,
        head: [['Section', 'Description']],
        body: [
            ['Name', `${consultor.consultorName}`],
            ['Email', `${consultor.consultorEmail}`],
            ['Phone', `${consultor.consultorPhone}`],
            ['Academic Experience', `${consultor.consultorAcademic}`],
            ['Work Experience', `${consultor.consultorWork}`],
            ['Skills', `${consultor.consultorSkills}`],
        ],
      });
      doc.save(`curriculum_vitae_of_${consultor.consultorName}.pdf`);
    } else {
      console.error('There are no consultants available to download in PDF.');
    }
  }
}
