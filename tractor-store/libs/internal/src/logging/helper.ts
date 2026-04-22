import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  help(message: string): void {
    console.log(`I helped with ${message}`);
  }
}
