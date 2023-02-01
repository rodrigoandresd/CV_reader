import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prefilled',
  templateUrl: './prefilled.component.html',
  styleUrls: ['./prefilled.component.scss']
})
export class PrefilledComponent implements OnInit {
  formTitle = 'email: example@mail.com'
  constructor() { }

  ngOnInit(): void {
  }

}
