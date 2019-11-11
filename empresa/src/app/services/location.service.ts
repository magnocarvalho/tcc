import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // GET
  getReverseGeocode(lan, lng): Observable<any> {
    return this.http.get<any>(this.baseurl + lan + ',' + lng + '&key=AIzaSyA1zOktcOr1AkPuG6SPT7_mOiK7Y67Z2rM')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
