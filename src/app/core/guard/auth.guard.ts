import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { PassportService } from '../passport/passport.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
  constructor(
    private router: Router,
    private passportService: PassportService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.passportService.user$.getValue();
    
    if (user != null) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;


    // if (localStorage.getItem('isLoggedin')) {
    //   return true;
    // }

    // this.router.navigate(['/login']);
    // return false;
  }
}
