import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MoistureService {

  private API = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  /** Latest record from MongoDB */


  /** Trigger backend → Tuya → MongoDB */
  refreshFromTuya() {
    return this.http.post(`${this.API}/tuya/refresh`, {});
  }

getLatest() {
  return this.http.get<any>(`${environment.apiUrl}/api/readings/latest`);
}

getAll() {
  return this.http.get<any[]>(`${environment.apiUrl}/api/readings`);
}
}