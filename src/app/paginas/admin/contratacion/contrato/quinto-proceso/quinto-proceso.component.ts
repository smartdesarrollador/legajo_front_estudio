import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quinto-proceso',
  templateUrl: './quinto-proceso.component.html',
  styleUrls: ['./quinto-proceso.component.css'],
})
export class QuintoProcesoComponent implements OnInit {
  selectedValue: string = '';
  @ViewChild('form1', { static: true }) form1: any;
  Swal = require('sweetalert2');
  datosLocales: any = {};
  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit() {
    this.asignarModeloContrato();
  }

  asignarModeloContrato(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (this.datosLocales.modelo_contrato) {
        this.selectedValue = this.datosLocales.modelo_contrato;
      } else {
        this.selectedValue = '';
      }
    }
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.modelo_contrato = this.selectedValue;

      this.cl.setItem('contratoLocal', contratoLocaldatos);

      this.router.navigate(['admin/contratacion/contrato/proceso_6']);
    } else {
      this.alerta();
    }
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Campo requerido',
    });
  }
}
