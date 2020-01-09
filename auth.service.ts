import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!!token)
      return true;
    return false;
  }

  isAuthenticatedAsync(): Promise<boolean> {
    const isAuthenticated = this.isAuthenticated();
    return Promise.resolve(isAuthenticated);
  }
}
