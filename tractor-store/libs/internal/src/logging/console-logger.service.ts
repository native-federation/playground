import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggerService {
  log(message: string): void {
    console.log(`[internal-logger] ${message}`);
  }
}
