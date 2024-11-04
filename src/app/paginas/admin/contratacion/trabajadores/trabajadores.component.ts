import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/interface/trabajador';
import { AreaService } from 'src/app/services/area.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { EstadoTrabajadorService } from 'src/app/services/estado-trabajador.service';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Area } from 'src/app/interface/area';
import { TipoContrato } from 'src/app/interface/tipo-contrato';
import { EstadoTrabajador } from 'src/app/interface/estado-trabajador';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css'],
})
export class TrabajadoresComponent implements OnInit {
  areas: Area[] = [];
  tiposContrato: TipoContrato[] = [];
  estadosTrabajador: EstadoTrabajador[] = [];
  trabajadores: Trabajador[] = [];

  selectedArea: number | null = null;
  selectedTipoContrato: number | null = null;
  selectedEstadoTrabajador: number | null = null;

  constructor(
    private areaService: AreaService,
    private tipoContratoService: TipoContratoService,
    private estadoTrabajadorService: EstadoTrabajadorService,
    private trabajadorService: TrabajadorService
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.getTiposContrato();
    this.getEstadosTrabajador();
    this.getTrabajadores(); // Carga inicial de trabajadores sin filtros
  }

  getAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (data: Area[]) => {
        this.areas = data;
      },
      error: (error) => {
        console.error('Error al obtener las áreas:', error);
        this.areas = []; // Asegura un array vacío en caso de error
      },
    });
  }

  getTiposContrato(): void {
    this.tipoContratoService.getTiposContrato().subscribe({
      next: (data: TipoContrato[]) => {
        this.tiposContrato = data;
      },
      error: (error) => {
        console.error('Error al obtener los tipos de contrato:', error);
        this.tiposContrato = []; // Asegura un array vacío en caso de error
      },
    });
  }

  getEstadosTrabajador(): void {
    this.estadoTrabajadorService.getEstadosTrabajador().subscribe({
      next: (data: EstadoTrabajador[]) => {
        this.estadosTrabajador = data;
      },
      error: (error) => {
        console.error('Error al obtener los estados de trabajador:', error);
        this.estadosTrabajador = []; // Asegura un array vacío en caso de error
      },
    });
  }

  getTrabajadores(): void {
    this.trabajadorService
      .getTrabajadores(
        this.selectedArea || undefined,
        this.selectedTipoContrato || undefined
      )
      .subscribe({
        next: (trabajadores: Trabajador[]) => {
          console.log('Lista de trabajadores:', trabajadores);
          this.trabajadores = trabajadores; // Asegura que trabajadores siempre sea un array
        },
        error: (error) => {
          console.error('Error al obtener los trabajadores:', error);
          this.trabajadores = []; // Asegura un array vacío si hay un error
        },
      });
  }

  onFilterChange(): void {
    this.getTrabajadores(); // Cada vez que se cambia un filtro, se vuelve a consultar los trabajadores
  }
}
