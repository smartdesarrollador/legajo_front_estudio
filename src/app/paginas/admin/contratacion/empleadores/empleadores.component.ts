import { Component, OnInit } from '@angular/core';
import { EmpleadorService } from 'src/app/services/empleador.service';
import { Empleador } from 'src/app/interface/empleador';
import { TipoEmpleador } from 'src/app/interface/tipo-empleador';
import { FiltroEmpleador } from 'src/app/interface/FiltroEmpleador';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empleadores',
  templateUrl: './empleadores.component.html',
  styleUrls: ['./empleadores.component.css'],
})
export class EmpleadoresComponent implements OnInit {
  empleadores: Empleador[] = [];
  tiposEmpleador: TipoEmpleador[] = [];
  filtro: FiltroEmpleador = {};
  private url_entorno_empresa = `${environment.urlEntornoEmpresa}`;

  constructor(
    private empleadorService: EmpleadorService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTiposEmpleador();
    this.getEmpleadoresListar();
  }

  getEmpleadoresListar(): void {
    this.empleadorService.getEmpleadoresListar().subscribe((data) => {
      this.empleadores = data;
    });
  }

  getTiposEmpleador(): void {
    // Suponiendo que el servicio de empleadores también tiene un método para obtener tipos de empleador.
    this.empleadorService.getTiposEmpleador().subscribe((data) => {
      this.tiposEmpleador = data;
    });
  }

  buscarEmpleadores(): void {
    this.empleadorService.searchEmpleadores(this.filtro).subscribe((data) => {
      this.empleadores = data;
    });
  }

  verEmpleador(id: number): void {
    // Redirigir a la vista del detalle del empleador
    console.log('Ver detalles del empleador con ID:', id);
  }

  nuevoEmpleador(): void {
    // Redirigir a la creación de un nuevo empleador.
    console.log('Redirigir a la creación de un nuevo empleador');
  }

  verEmpresa(userId: any): void {
    this.tokenService.generateTemporaryToken(userId).subscribe({
      next: (response) => {
        const token = response.token;
        console.log('Token recibido desde el backend:', token);
        this.redirectToEmpresaDashboard(token);
      },
      error: (error) => {
        console.error('Error generando el token', error);
      },
    });
  }

  private redirectToEmpresaDashboard(token: string): void {
    // Aquí se define la URL del entorno de empresa
    console.log('Token que se envía a la URL:', token);
    const empresaUrl = `${this.url_entorno_empresa}/admin/dashboard?token=${token}`;
    console.log('url_para_empresa', empresaUrl);
    window.open(empresaUrl, '_blank'); // Abre en una nueva pestaña.
  }
}
