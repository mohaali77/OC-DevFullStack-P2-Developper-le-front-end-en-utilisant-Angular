import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() data!: Olympic[] | undefined;
  
  ngOnInit(): void {
      console.log(this.data);
      
  }
  
}
