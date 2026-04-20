import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorDataService } from '../services/sensor-data.service';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  ScatterController,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  ScatterController,
  PieController,
  ArcElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.css']
})
export class HistoryComponent implements OnInit {

  data: any[] = [];
  calendar: any[] = [];
  selectedDate: string | null = null;

  dayBarChart: Chart | null = null;

  constructor(private sensorService: SensorDataService) {}

  ngOnInit(): void {
    this.sensorService.getAll().subscribe(res => {
      this.data = res;
      this.buildCalendar();
      setTimeout(() => this.createCharts(), 200);
    });
  }

  /* ---------------- CALENDAR ---------------- */

  buildCalendar(): void {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const days = new Date(y, m, 0).getDate();

    this.calendar = [];
    for (let d = 1; d <= days; d++) {
      const date = `${y}-${this.pad(m)}-${this.pad(d)}`;
      this.calendar.push({
        date,
        hasData: this.data.some(x => x.createdAt.startsWith(date))
      });
    }
  }

  selectDay(day: any): void {
    if (!day.hasData) {
      this.selectedDate = null;
      this.destroyDayChart();
      return;
    }

    this.selectedDate = day.date;

    const dayData = this.data
      .filter(d => d.createdAt.startsWith(day.date))
      .sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    setTimeout(() => this.draw24HourBarChart(dayData), 100);
  }

  /* ---------------- MAIN CHARTS ---------------- */

  createCharts(): void {
    if (!this.data.length) return;

    const labels = this.data.map(d =>
      new Date(d.createdAt).toLocaleString()
    );

    const temp = this.data.map(d => d.temperatureC);
    const humidity = this.data.map(d => d.humidity);

    /* Temperature vs Time */
    new Chart('tempChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temp,
          borderColor: 'red',
          tension: 0.3
        }]
      }
    });

    /* Humidity vs Time */
    new Chart('humidityChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Humidity (%)',
          data: humidity,
          borderColor: 'blue',
          tension: 0.3
        }]
      }
    });

    /* Temperature Pie (3D style) */
    new Chart('tempPieChart', {
      type: 'pie',
      data: {
        labels: ['Cold', 'Moderate', 'Hot'],
        datasets: [{
          data: this.tempDistribution(),
          backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350'],
          borderWidth: 5,
          hoverOffset: 20
        }]
      }
    });

    /* Humidity Pie (3D style) */
    new Chart('humidityPieChart', {
      type: 'pie',
      data: {
        labels: ['Dry', 'Normal', 'Wet'],
        datasets: [{
          data: this.humidityDistribution(),
          backgroundColor: ['#ffb74d', '#4db6ac', '#1e88e5'],
          borderWidth: 5,
          hoverOffset: 20
        }]
      }
    });
  }

  /* ---------------- 24 HOUR BAR CHART ---------------- */

  draw24HourBarChart(dayData: any[]): void {
    this.destroyDayChart();

    const labels = dayData.map(d =>
      new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    this.dayBarChart = new Chart('dayBarChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: dayData.map(d => d.temperatureC),
            backgroundColor: 'rgba(255,99,132,0.7)'
          },
          {
            label: 'Humidity (%)',
            data: dayData.map(d => d.humidity),
            backgroundColor: 'rgba(54,162,235,0.7)'
          }
        ]
      }
    });
  }

  destroyDayChart(): void {
    if (this.dayBarChart) {
      this.dayBarChart.destroy();
      this.dayBarChart = null;
    }
  }

  /* ---------------- HELPERS ---------------- */

  tempDistribution(): number[] {
    let cold = 0, moderate = 0, hot = 0;
    this.data.forEach(d => {
      if (d.temperatureC < 15) cold++;
      else if (d.temperatureC <= 25) moderate++;
      else hot++;
    });
    return [cold, moderate, hot];
  }

  humidityDistribution(): number[] {
    let dry = 0, normal = 0, wet = 0;
    this.data.forEach(d => {
      if (d.humidity < 40) dry++;
      else if (d.humidity <= 70) normal++;
      else wet++;
    });
    return [dry, normal, wet];
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}