import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  olympicSubscription!: Subscription
  olympicData!: Olympic[] | undefined
  numberOfJos: number = 0;
  numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService) { }

  /**
   * Lors de l'initialisation du composant, on appel la fonction
   * qui nous permet de récupérer les données depuis le service. 
   */
  ngOnInit(): void {
    this.getData()
  }

  /**
   * Lors de la destruction du composant, si il y a un abonnement
   * on se désabonne pour éviter les fuites de données. 
   */
  ngOnDestroy(): void {
    if (this.olympicSubscription) {
      this.olympicSubscription.unsubscribe()
    }

  }

  /**
   * Fonction qui permet de récupérer les données depuis le service 
   * en souscrivant à un abonnement de l'observable. 
   */
  getData(): void {
    this.olympicSubscription = this.olympicService.getOlympics().subscribe(data => {
      this.olympicData = data;
      this.displayDataPanel()

    })

  }

  /**
   * Fonction qui va attribuer aux variable des valeurs 
   * pour indiquer le nombre total de pays, et le nombre de jo
   */
  displayDataPanel() {
    if (this.olympicData && this.olympicData.length > 0) {

      this.numberOfCountries = this.olympicData.length
      this.numberOfJos = this.olympicData[0].participations.length

    }

  }


}
