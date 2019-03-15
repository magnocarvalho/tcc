import { Injectable } from '@angular/core';

const TOKEN_FIREBASE = 'firebase';
const TOKEN_ID = 'token';

@Injectable()
export class TokenStorage {
  constructor() {}

  signOut() {
    window.localStorage.removeItem(TOKEN_FIREBASE);
    window.localStorage.removeItem(TOKEN_ID);
    window.localStorage.clear();
  }

  public saveID(token: string) {
    if (!token) { return; }
    window.localStorage.removeItem(TOKEN_ID);
    window.localStorage.setItem(TOKEN_ID, token);
  }

  public getID(): string {
    return localStorage.getItem(TOKEN_ID);
  }
  public saveFirebase(token: string) {
    if (!token) { return; }
    window.localStorage.removeItem(TOKEN_FIREBASE);
    window.localStorage.setItem(TOKEN_FIREBASE, token);
  }

  public getFirebase(): string {
    return localStorage.getItem(TOKEN_FIREBASE);
  }
}
