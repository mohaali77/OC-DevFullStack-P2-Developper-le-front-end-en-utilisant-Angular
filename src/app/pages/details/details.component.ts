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

  ngOnInit(): void {
    this.getParamsId()
    this.getData()
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe()
  }

  displayDataPanel(): void {

    this.countryName = this.olympicData?.country
    this.numberOfEntries = this.olympicData?.participations.length

    this.olympicData?.participations.map(element => {
      this.numberOfMedals += element.medalsCount
      this.numberOfAthletes += element.athleteCount
    })


  }

  getParamsId(): void {
    this.route.params.subscribe(params => {
      this.countryId = Number(params['id']);
      console.log('Test ID:', this.countryId);
    });
  }

  returnErrorPage(){

    setTimeout(()=>{
      if (this.olympicData === undefined){
      this.router.navigate(['/**']);
    }
    }, 100)

    
  }

  getData(): void {
    this.olympicSubscription = this.olympicService.getOlympicById(this.countryId).subscribe(
      data => {
        if(data){
          this.olympicData = data;
          this.displayDataPanel()
        } else {    
        this.returnErrorPage()  
       } 
      }
    )
  }

}
