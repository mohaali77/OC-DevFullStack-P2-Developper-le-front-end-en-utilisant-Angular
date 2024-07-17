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
  olympicSubscription! : Subscription
   olympicData! : Olympic[] | undefined

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.getData()    
  }

  ngOnDestroy(): void {
    if(this.olympicSubscription){
      this.olympicSubscription.unsubscribe()
    }
    
  }

  getData(): void {
    this.olympicSubscription = this.olympicService.getOlympics().subscribe( data =>{
        this.olympicData = data;
      })     
  }
  

}
