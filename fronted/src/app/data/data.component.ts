import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SensorDataService } from '../services/sensor-data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  data: any[] = [];
  filteredData: any[] = [];
  paginatedData: any[] = [];

  // Filters
  minTemp?: number;
  maxHumidity?: number;
  startDate?: string;
  endDate?: string;

  // Sorting
  sortField = '';
  sortAsc = true;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private sensorService: SensorDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.sensorService.getAll().subscribe({
      next: res => {
        this.data = res;
        this.filteredData = [...res];
        this.setupPagination();
      },
      error: err => console.error('Error loading data', err)
    });
  }

  applyFilters(): void {
    this.filteredData = this.data.filter(item =>
      (!this.minTemp || item.temperatureC >= this.minTemp) &&
      (!this.maxHumidity || item.humidity <= this.maxHumidity) &&
      (!this.startDate || new Date(item.createdAt) >= new Date(this.startDate)) &&
      (!this.endDate || new Date(item.createdAt) <= new Date(this.endDate))
    );
    this.currentPage = 1;
    this.setupPagination();
  }

  reset(): void {
    this.filteredData = [...this.data];
    this.minTemp = this.maxHumidity = this.startDate = this.endDate = undefined;
    this.currentPage = 1;
    this.setupPagination();
  }

  sort(field: string): void {
    this.sortAsc = this.sortField === field ? !this.sortAsc : true;
    this.sortField = field;

    this.filteredData.sort((a, b) => {
      if (a[field] > b[field]) return this.sortAsc ? 1 : -1;
      if (a[field] < b[field]) return this.sortAsc ? -1 : 1;
      return 0;
    });

    this.setupPagination();
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  // 📄 Export to PDF
  exportToPDF(): void {
    const element = document.getElementById('pdf-table');
    if (!element) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 190;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.text('Sensor Data Report', 14, 10);
      pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);
      pdf.save('sensor-data.pdf');
    });
  }
}
