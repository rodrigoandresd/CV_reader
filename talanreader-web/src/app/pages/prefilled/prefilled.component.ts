import { Component, OnInit } from '@angular/core';
import consultorData from '../../demo.json';

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

}
