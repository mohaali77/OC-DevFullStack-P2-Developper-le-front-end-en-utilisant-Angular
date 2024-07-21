import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDetailsPage: boolean = false; 


  constructor(private router: Router) { }


  ngOnInit(): void {
    this.extractDetailsSegment();
  }

  extractDetailsSegment(): void {
    const urlSegments = this.router.url.split('/');    
    const detailsSegment = urlSegments.find(element => element === 'details');
    detailsSegment === 'details' ? this.isDetailsPage = true : this.isDetailsPage = false
  }

}
