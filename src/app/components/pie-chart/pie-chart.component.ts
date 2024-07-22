import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataPie } from 'src/app/core/models/DataPie';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'] // Correction de styleUrl en styleUrls
})
export class PieChartComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() data!: Olympic[] | undefined;

  pieChartData: DataPie[] = [];

  view: [number, number] = [800, 500];
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  ngOnInit(): void {
    this.createPieChartData();
  }

  createPieChartData(): void {
    if (this.data) {
      this.pieChartData = this.data.map(element => {
        let medalsTotal = 0;

        // On parcourt le tableau "participation" pour chaque objet/pays
        element.participations.forEach(participation => {
          // On ajoute chaque médaille remportée à chaque participation au total des médailles
          medalsTotal += participation.medalsCount;
        });

        // Pour chaque pays, on retourne un objet avec le nom du pays et le total des médailles
        return { name: element.country, value: medalsTotal } as DataPie;
      });
    }
  }

  onSelect(data: any): void {
    //fonction qui permet de naviguer vers le pays cliqué
    let countrySelected = data.name;
    let foundObject = this.data?.find(element => element.country === countrySelected);

    if  (foundObject?.id){
      this.router.navigate(['/details', foundObject?.id]);
    }else{
      this.router.navigate(['/**']);
    }
    

  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }
}
