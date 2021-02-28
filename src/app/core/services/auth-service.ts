import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdminRole(): boolean {
    return Math.random() < 0.5;
  }
}
