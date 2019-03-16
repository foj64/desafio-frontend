import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Alerta } from './alerta/alerta.model'
import { AlertasService } from './alertas.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {Observable, from} from 'rxjs'
import {switchMap, tap, debounceTime , distinctUntilChanged, catchError} from 'rxjs/operators'

@Component({
  selector: 'de-alertas',
  templateUrl: './alertas.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class AlertasComponent implements OnInit {

  searchBarState = 'hidden'
  alertas: Alerta[]
  
  searchForm: FormGroup
  searchControlPontoDeVenda: FormControl
  searchControlTipo: FormControl

  constructor(private alertasService: AlertasService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControlPontoDeVenda = this.fb.control('')
    this.searchControlTipo = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControlPontoDeVenda: this.searchControlPontoDeVenda,
      searchControlTipo: this.searchControlTipo
    })

    this.searchControlPontoDeVenda.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(searchTerm => this.alertasService.alertas(searchTerm, this.searchControlTipo.value)
          .pipe(catchError(error => from([]))))
        ).subscribe(alertas => this.alertas = alertas)
   
    this.searchControlTipo.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(searchTerm => this.alertasService.alertas(this.searchControlPontoDeVenda.value, searchTerm)
          .pipe(catchError(error => from([]))))
        ).subscribe(alertas => this.alertas = alertas)


      this.alertasService.alertas().subscribe(alertas => this.alertas = alertas)
  }
    
  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
