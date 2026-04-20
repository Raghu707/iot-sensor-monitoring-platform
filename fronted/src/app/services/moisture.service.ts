import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoistureService {

  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  /** Latest record from MongoDB */


  /** Trigger backend → Tuya → MongoDB */
  refreshFromTuya() {
    return this.http.post(`${this.API}/tuya/refresh`, {});
  }

getLatest() {
  return this.http.get<any>('http://localhost:5000/api/readings/latest');
}

getAll() {
  return this.http.get<any[]>('http://localhost:5000/api/readings');
}
}