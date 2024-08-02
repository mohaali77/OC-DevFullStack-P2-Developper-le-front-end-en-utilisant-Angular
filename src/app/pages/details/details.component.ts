import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) { }

  olympicSubscription!: Subscription
  olympicData!: Olympic | undefined

  numberOfEntries: number | undefined = 0
  numberOfMedals: number = 0
  numberOfAthletes: number = 0
  countryName: string | undefined = ''

  countryId!: number;

  /**
   * Lors de l'initialisation du composant, on appel la fonction
   * qui nous permet de récupérer les données depuis le service. 
   */
  ngOnInit(): void {
    this.getParamsId()
    this.getData()
  }

  /**
   * Lors de la destruction du composant, si il y a un abonnement
   * on se désabonne pour éviter les fuites de données. 
   */
  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe()
  }

  /**
   * Fonction qui va attribuer aux variable des valeurs 
   * pour afficher le nom, le nombre de participation, le nombre de médailles, et le nombre d'athlete
   */
  displayDataPanel(): void {

    this.countryName = this.olympicData?.country
    this.numberOfEntries = this.olympicData?.participations.length

    this.olympicData?.participations.map(element => {
      this.numberOfMedals += element.medalsCount
      this.numberOfAthletes += element.athleteCount
    })
  }


  /**
   * Fonction qui permet récupérer l'id en paramètre URL. 
   * le Number() permet de transformer le string en numéro
   */
  getParamsId(): void {
    this.route.params.subscribe(params => {
      this.countryId = Number(params['id']);
      console.log('Test ID:', this.countryId);
    });
  }

  /**
   * Fonction qui permet de retourner vers la page d'erreur si les données sont undefined
   * le setTimeout permet de retarder la condition pour permettre aux données d'avoir le temps de se charger
   */
  returnErrorPage() {
    setTimeout(() => {
      if (this.olympicData === undefined) {
        this.router.navigate(['/**']);
      }
    }, 100)
  }

  /**
   * Fonction qui permet de récupérer les données depuis le service 
   * en souscrivant à un abonnement de l'observable. 
   */
  getData(): void {
    this.olympicSubscription = this.olympicService.getOlympicById(this.countryId).subscribe(
      data => {
        if (data) {
          this.olympicData = data;
          this.displayDataPanel()
        } else {
          this.returnErrorPage()
        }
      }
    )
  }

}
