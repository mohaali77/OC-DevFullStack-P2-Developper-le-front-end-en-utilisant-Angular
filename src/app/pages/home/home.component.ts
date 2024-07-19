import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  olympicSubscription! : Subscription
   olympicData! : Olympic[] | undefined

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.getData()    
    
  }

  ngOnDestroy(): void {
    //si il y a abonnement, on se désabonne pour éviter les fuites de données
    if(this.olympicSubscription){
      this.olympicSubscription.unsubscribe()
    }
    
  }

  getData(): void {
    //on récupère les données depuis le service avec un abonnement
    this.olympicSubscription = this.olympicService.getOlympics().subscribe( data =>{
        this.olympicData = data;
        console.log(this.olympicData);
        this.displayData()
        
      })     
     
  }

  displayData(){
      console.log(this.olympicData);
      
  }
  

}
