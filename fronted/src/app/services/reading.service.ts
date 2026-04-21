import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReadingService {
  
private BASE_URL = `${environment.apiUrl}/api`;
private READINGS_URL = `${environment.apiUrl}/api/readings`;


  constructor(private http: HttpClient) {}

  /** Dashboard: latest reading */
  getLatestReading() {
    return this.http.get<any>(`${this.BASE_URL}/readings/latest`);
  }

  /** Trigger Tuya refresh */
  refreshFromTuya() {
    return this.http.post(`${this.BASE_URL}/tuya/refresh`, {});
  }

  /** History */

  
  getAllReadings() {
    return this.http.get<any[]>(this.READINGS_URL);
  }

}