import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private olympicService : OlympicService, private route : ActivatedRoute){}

  olympicSubscription! : Subscription
  routeSubscription! : Subscription

  olympicData! : Olympic | undefined

  numberOfEntries! : number
  numberOfMedals! : number
  numberOfAthletes! : number

  countryId!: number;

  ngOnInit(): void {
      this.getParamsId()
      this.getData()
      this.displayDataPanel()
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe()
  }

  displayDataPanel(){
    /*this.numberOfEntries = this.olympicData?.participations.length
    this.numberOfMedals = this.olympicData?.
    this.numberOfAthletes = */

  }

  getParamsId(){
    this.route.params.subscribe(params => {
      this.countryId = Number(params['id']); 
      console.log('Test ID:', this.countryId);
    });
  }

  getData(){
    this.olympicSubscription = this.olympicService.getOlympicById(this.countryId).subscribe(
      data => this.olympicData = data
    )

    if (this.olympicData){
      console.log(this.olympicData);
      
    }
    
  }

}
