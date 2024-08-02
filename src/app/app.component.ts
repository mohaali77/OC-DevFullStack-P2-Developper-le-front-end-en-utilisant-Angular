import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public olympicSubscription!: Subscription;

  constructor(private olympicService: OlympicService) { }

  /**
   * Lors de l'initialisation du composant on charge les données olympiques initiales en s'abonnant au service olympicService.
   */
  ngOnInit(): void {
    this.olympicSubscription = this.olympicService.loadInitialData().subscribe();
  }

    /**
   * Lors de la destruction du composant, si il y a un abonnement
   * on se désabonne pour éviter les fuites de données. 
   */
  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }
}
