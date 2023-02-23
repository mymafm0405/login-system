import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private loginServ: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const promise = new Promise<boolean>((resolve, reject) => {
        if (this.loginServ.user.value) {
            resolve (true);
        } else {
            resolve(false)
            this.router.navigate(['/'])
        }
    })
    return promise;
  }
}
