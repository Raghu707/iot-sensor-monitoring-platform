import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReadingService {

  private BASE_URL = 'http://localhost:5000/api';
  private READINGS_URL = 'http://localhost:5000/api/readings';

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