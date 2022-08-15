import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate{

  constructor(private storage: LocalStorageUtils, private router: Router) { }

  canActivate(): boolean {
    if (!this.storage.isAuthenticated())
      this.router.navigate(['/login']);

    return true;
  }
}