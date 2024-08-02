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

  constructor(private router: Router) {
    /**
   * Permet d'ajuster, avant l'initialisation du composant de définir, la proportion du graphique
   * en fonction de la taille de l'écran 
   */
    this.view = [innerWidth / 1, 0];

  }

  @Input() data!: Olympic[] | undefined;

  pieChartData: DataPie[] = [];

  /**
   * On définit les différents paramètres du graphique pour l'initialiser 
   * */
  view: [number, number] = [800, 500];
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  ngOnInit(): void {
    this.createPieChartData();
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1, 0];

  }

  /**
   * Fonction qui va créer les données qui seront utilisées par le graphique
   * Si les donneés sont accessible,
   * On créé un nouveau tableau "pieChartData" depuis ces données
   * Et pour chaque pays, on retourne un objet avec le nom du pays et le total des médailles
   * Avec comme modèle l'interface DataPie
   */
  createPieChartData(): void {
    if (this.data) {
      this.pieChartData = this.data.map(element => {
        let medalsTotal = 0;

        element.participations.forEach(participation => {
          medalsTotal += participation.medalsCount;
        });

        return { name: element.country, value: medalsTotal } as DataPie;
      });
    }
  }

  /**
   * Fonction qui permet lors du clic sur un des pays du graphique d'être redirigé vers la page du pays
   * On récupère le nom du pays cliqué,
   * On utilise la méthode find pour retrouvé le pays, grâce au nom
   * Si on retrouve bien l'id du pays, on le renvoi vers la page de détails avec son id
   * Sinon on le renvoi vers une page d'erreur
   * @param data Les données présent dans le graphique
   **/
  onSelect(data: any): void {
    let countrySelected = data.name;
    let foundCountry = this.data?.find(element => element.country === countrySelected);

    if (foundCountry?.id) {
      this.router.navigate(['/details', foundCountry?.id]);
    } else {
      this.router.navigate(['/**']);
    }


  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }
}
