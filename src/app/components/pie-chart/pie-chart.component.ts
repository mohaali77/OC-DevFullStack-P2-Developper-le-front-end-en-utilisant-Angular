import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DataPie } from 'src/app/core/models/DataPie';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})


export class PieChartComponent implements OnInit {
  @Input() data!: Olympic[] | undefined;

  pieChartData : any = []

//j'ai les data, je veuxx convertir les data
  
  view: [number, number] = [800, 500];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  ngOnInit(): void {
    this.createPieChartData()
      
  }

  createPieChartData(): any {


  }

  onSelect(data:any): void {
   
    let countrySelected = data.name;

    let foundObject = this.data?.find(element => element.country === countrySelected);

  }

  convertData():any{

    this.pieChartData = this.data?.map(element => {
      let medalsTotal = 0;
  
      // on parcours le tableau "participation" pour chaque objets/pays
      element.participations.forEach(participation => {
        //on ajoute chaque médailles remportés à chaque participation au total des médailles
        medalsTotal += participation.medalsCount;
      });
  
      // pour chaque pays, on retourne un objet avec l'ID du pays, le nom du pays et le total des médailles
      return { id: element.id, country: element.country, medalsTotal: medalsTotal };
    });

  }


  onActivate(data:any): void {    
  }

  onDeactivate(data:any): void {
  }

  
}
