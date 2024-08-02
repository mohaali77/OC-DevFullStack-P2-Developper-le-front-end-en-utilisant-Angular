import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) { }


  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Simple service qui permet de récupérer les données de tous les pays
   * @returns {Observable<Olympic[] | undefined>} Un observable qui émet les données olympiques des pays, ou `undefined`
   */
  getOlympics(): Observable<Olympic[] | undefined> {
    return this.olympics$.asObservable();
  }

  /**
   * Service qui permet de récupérer les données spécifiques d'un pays à l'aide de son id.
   * Méthode find utilisé pour comparé l'id en paramètre, et l'id du tableau d'olympic
   * @param {number} id - L'identifiant unique du pays pour lequel les données olympiques doivent être récupérées.
   * @returns {Observable<Olympic | undefined>} - Un observable qui émet les données olympiques du pays correspondant, ou `undefined` si aucun pays avec cet id n'est trouvé.
   */
  getOlympicById(id: number): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(
      map(olympics => olympics.find((olympic) => olympic.id === id)
      ))
  }
}
