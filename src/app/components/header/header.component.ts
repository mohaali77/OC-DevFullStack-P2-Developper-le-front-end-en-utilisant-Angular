import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Si isDetailsPage est false, on affiche un header sans bouton retour. Si true, on affiche un bouton.
   */
  isDetailsPage: boolean = false;

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.extractDetailsSegment();
  }

  /**
  * Fonction qui permet de définir si isDetailsPage est true ou non, si nous sommes sur la page de détails
  */
  extractDetailsSegment(): void {
    const urlSegments = this.router.url.split('/');
    const detailsSegment = urlSegments.find(element => element === 'details');
    detailsSegment === 'details' ? this.isDetailsPage = true : this.isDetailsPage = false
  }

}