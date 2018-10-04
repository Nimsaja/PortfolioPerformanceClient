import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of, Observer} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { Data } from './data';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private heroesUrl = 'https://portfolio-218213.appspot.com/portfolio/table';
  // private heroesUrl = 'http://localhost:8080/portfolio/table';

  constructor(private http: HttpClient) { }

  /** GET stocks data from the server */
  fetchData(): Observable<Data[]> {
    console.log('Try to fetch data');
    return this.http.get<Data[]>('https://portfolio-218213.appspot.com/portfolio/table').pipe(
      tap(data => console.log('fetching data array of length ' + data.length)),
      catchError(this.handleError('fetchData', []))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
