import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string): string | null {
    if (sessionStorage && window) {
      const value = sessionStorage.getItem(window.btoa(key));

      return value ? window.atob(value) : null;
    }
    return null;
  }

  set(key: string, value: any): void {
    if (sessionStorage && window) {
      sessionStorage.setItem(window.btoa(key), window.btoa(value));
    }
  }
}