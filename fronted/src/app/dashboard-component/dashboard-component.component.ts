import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingService } from '../services/reading.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponent implements OnInit {

  latest: any = null;
  loading = false;
  refreshing = false;

  constructor(private readingService: ReadingService) {}

  ngOnInit(): void {
    this.loadLatest();
  }

  loadLatest(): void {
    this.loading = true;

    this.readingService.getLatestReading().subscribe({
      next: (res) => {
        console.log('✅ Latest reading:', res); // DEBUG
        this.latest = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Dashboard error:', err);
        this.loading = false;
      }
    });
  }

  refreshFromTuya(): void {
    this.refreshing = true;

    this.readingService.refreshFromTuya().subscribe({
      next: () => {
        console.log('✅ Tuya refresh success');
        this.refreshing = false;
        this.loadLatest(); // reload dashboard
      },
      error: (err) => {
        console.error('❌ Tuya refresh failed', err);
        this.refreshing = false;
      }
    });
  }

  get status(): string {
    if (!this.latest) return '';
    if (this.latest.humidity < 30) return 'Dry';
    if (this.latest.humidity > 70) return 'Wet';
    return 'Normal';
  }
}