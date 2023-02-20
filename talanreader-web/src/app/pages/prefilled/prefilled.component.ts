import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrefilledService } from './services/prefilled.service';
import { tap } from 'rxjs/operators';
import { Consultor } from './interfaces/prefilled.interface';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RestService } from '../../rest.service'; // Import RestService module
import { Router } from '@angular/router'; // Import Router module

// import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-prefilled',
  templateUrl: './prefilled.component.html',
  styleUrls: ['./prefilled.component.scss']
})
export class PrefilledComponent implements OnInit {
  consultors!: Consultor[];
  @Output() saveToJsonClick = new EventEmitter<Consultor>();
  constructor(private consultorSvc: PrefilledService, private restService: RestService, private router: Router){ //TODO estoy inyect

  }


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
      window.alert('Recording done successfully');
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
  saveWorkDates(event: Event, index: number): void {
    const work = event.target as HTMLInputElement;
    const consultor = this.consultors[0];
    consultor.consultorWork[index].dates = work.value;
  }
  saveWorkInfo(event: Event, index: number): void {
    const work = event.target as HTMLInputElement;
    const consultor = this.consultors[0];
    consultor.consultorWork[index].info = work.value;
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

      const tableData = [
        ['Name', `${consultor.consultorName}`],
        ['Email', `${consultor.consultorEmail}`],
        ['Phone', `${consultor.consultorPhone}`],
        ['Academic Experience', `${consultor.consultorAcademic}`],
        ['Work Experience', ""],
        ['Skills', `${consultor.consultorSkills}`],
      ];

      for (let i = 0; i < consultor.consultorWork.length; i++) {
        const dates = consultor.consultorWork[i].dates;
        const info = consultor.consultorWork[i].info;
        tableData[4][1] += `Dates ${i + 1}: ${dates}\nInfo ${i + 1}: ${info}\n\n`;
      }

      autoTable(doc, {
        startY: 40,
        head: [['Section', 'Description']],
        body: tableData,
      });
      doc.save(`curriculum_vitae_of_${consultor.consultorName}.pdf`);
    } else {
      console.error('There are no consultants available to download in PDF.');
    }
  }

  goToHome(): void {
    // Redirect to the form page after successful file upload
    this.router.navigate(['/upload']).then(() => {
      window.location.reload();
    });
  }
}
