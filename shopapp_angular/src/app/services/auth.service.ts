// auth.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();
  isLoggedInChange = new EventEmitter<boolean>();
  setLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
    this.isLoggedInChange.emit(value);
  }
}