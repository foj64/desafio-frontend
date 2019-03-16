import { Component, OnInit, Input } from '@angular/core';
import { Alerta } from './alerta.model';

@Component({
  selector: 'de-alerta',
  templateUrl: './alerta.component.html'
})
export class AlertaComponent implements OnInit {

  @Input() alerta: Alerta

  constructor() { }

  ngOnInit() {
    if (this.alerta.flTipo === 1) {
      this.alerta.imagem = "assets/img/ruptura.jpg"
    } else if (this.alerta.flTipo === 2) {
      this.alerta.imagem = "assets/img/arrowUp.jpg"
    } else if (this.alerta.flTipo === 3) {
      this.alerta.imagem = "assets/img/arrowDown.jpg"
    }
  }

}
