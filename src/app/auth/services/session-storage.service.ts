import {Inject, Injectable, InjectionToken } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

//export const WINDOW = new InjectionToken<Window> ('window-token');

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  ///constructor(@Inject(Window) private window: Window){}

  setToken(token: string){
    // Add your code here
    console.log("enter setToken")
    window.sessionStorage.setItem(TOKEN, token);

  }

  getToken(): string | null {
    // Add your code here
    return window.sessionStorage.getItem(TOKEN);

  }

  deleteToken(){
    // Add your code here
    window.sessionStorage.removeItem(TOKEN);
  }
}
