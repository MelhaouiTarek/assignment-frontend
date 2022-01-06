import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    console.log("dans canActivate");
    return this.authService.isAdmin().then(authentifie => {
      if (authentifie) {
        console.log("OK! you are admin");
        return true;
      }
      else {
        console.log("Not OK! you are not Admin. Going back to /home");
        this.router.navigate(["/home"]);
        return false;
      }
    })
  }

}
