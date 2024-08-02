import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { DataLine } from 'src/app/core/models/DataLine';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input() data!: Olympic | undefined;
  lineChartData: DataLine[] | undefined = [];


  /**
   * On définit les différents paramètres du graphique pour l'initialiser
   */
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

  constructor() {
    if (innerWidth <= 768) {
      this.view = [innerWidth / 1, 400];
    } else {
      this.view = [innerWidth / 1.3, 600];
    }
  }

  /**
   * fonction
   */

  onResize(event: any) {

    if (window.innerWidth <= 768) {
      this.view = [event.target.innerWidth / 1, 400];
    } else {
      this.view = [event.target.innerWidth / 1.3, 600];
    }
  }

  ngOnInit(): void {
    this.adjustScale();
    this.createLineChartData();
  }

  ngOnDestroy(): void {
  }

  /**
 * Fonction qui va ajuster les échelles en fonctions des valeurs pour avoir un meilleur visuel. 
 * On définit une échelle sur +infinis et l'autre sur -infinis. 
 * Si le nombre de médaille est inférieur à -infini on ajuste l'échelle à 5 cran en dessous du nombre de médailles
 * Si le nombre de médaille est supérieur à +infini on ajuste l'échelle à 5 cran au dessus du nombre de médailles
 * */
  adjustScale(): void {
    this.data?.participations.forEach(participation => {
      if (participation.medalsCount < this.yScaleMin) {
        this.yScaleMin = participation.medalsCount - 5;
      }
      if (participation.medalsCount > this.yScaleMax) {
        this.yScaleMax = participation.medalsCount + 5;
      }
    });
  }

  /**
   * Fonction qui créer les données qui seront utilisées par le graphique   
   * */
  createLineChartData(): DataLine[] {
    return this.lineChartData = [{
      name: this.data?.country,
      series: this.data?.participations.map(participation => ({
        name: participation.year.toString(),
        value: participation.medalsCount,
      })) ?? []
    }];
  }

  onSelect(data: any): void { }
  onActivate(data: any): void { }
  onDeactivate(data: any): void { }
}