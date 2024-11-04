import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  rol_valor: any;

  constructor(private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const token = localStorage.getItem('token_estudio');

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        console.log('Decoded JWT:', decodedToken);

        this.rol_valor = decodedToken.rol;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.router.navigate(['auth/login']);
        return false;
      }
    }

    /*  if (token) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    } */

    if (this.rol_valor == 'Admin') {
      if (token) {
        return true;
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  };
}
