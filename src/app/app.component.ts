import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  content = 'Welcome do Desafio App!'

  constructor() { }

  ngOnInit() {
  }
}
