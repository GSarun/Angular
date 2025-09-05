import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  factories = [
    { id: 'mahachai', name: 'โรงงานมหาชัย' },
    { id: 'ranot', name: 'โรงงานระโนด' }
  ];

  departments: { [key: string]: string[] } = {
    mahachai: ['ฝ่ายผลิตอาหารกุ้ง', 'ฝ่ายอาหารปลา'],
    ranot: ['ฝ่ายผลิตอาหารกุ้ง']
  };

  selectedFactory: string = 'mahachai';
  selectedDepartment: string = '';
  departmentOptions: string[] = [];

  constructor() {
    this.updateDepartmentOptions();
  }

  selectFactory(factoryId: string) {
    this.selectedFactory = factoryId;
    this.updateDepartmentOptions();
    this.selectedDepartment = '';
  }

  selectDepartment(department: string) {
    this.selectedDepartment = department;
  }

  updateDepartmentOptions() {
    this.departmentOptions = this.departments[this.selectedFactory] || [];
  }
}