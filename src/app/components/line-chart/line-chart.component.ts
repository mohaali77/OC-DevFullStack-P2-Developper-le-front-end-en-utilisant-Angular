import { Component, OnInit, Input } from '@angular/core';
import { NumberValue, partition } from 'd3';
import { DataLine } from 'src/app/core/models/DataLine';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(){}

  @Input() data!: Olympic | undefined;
  lineChartData : DataLine[] | undefined = [] 

  view: [number, number] = [800, 600];
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Years';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  yScaleMin: number = Infinity; 
  yScaleMax: number = -Infinity; 
  

  ngOnInit(): void {        
    this.adjustScale()
    this.createLineChartData();
  }

  adjustScale(){
    this.data?.participations.forEach(participation => {
      if (participation.medalsCount < this.yScaleMin) {
        this.yScaleMin = participation.medalsCount - 5 ;
      }
      if (participation.medalsCount > this.yScaleMax) {
        this.yScaleMax = participation.medalsCount + 5 ;
      }
    });
  }

  createLineChartData() : DataLine[] {

    return this.lineChartData = [{
      name: this.data?.country,
      series: this.data?.participations.map(participation => ({
        name: participation.year.toString(),
        value: participation.medalsCount,
      })) ?? []
    }];
  }
  

  onSelect(data:any): void {
  }

  onActivate(data:any): void {
  }

  onDeactivate(data:any): void {
  }

}
